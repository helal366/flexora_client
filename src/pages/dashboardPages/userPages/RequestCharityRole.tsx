import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../api/queryClient";
import { useNavigate } from "react-router";
import useCloudinaryImageUpload from "../../../hooks/useCloudinaryImageUpload";
import {
  CharityPaymentRequest,
  CharityRolePatchPayload,
  CharityRolePatchResponse,
  RequestCharityRoleForm,
} from "../../../types/transactions";
import { AxiosResponse } from "axios";

interface PaymentIntentResponse {
  clientSecret: string | null;
}
const RequestCharityRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  if (!user) {
    throw new Error("User not found");
  }
  const userEmail = user.email;
  const userName = user.displayName;
  if (!userEmail || !userName) {
    throw new Error("email or name not found");
  }
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<RequestCharityRoleForm>();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const {
    mutateAsync: uploadImage,
    isPending,
    isError,
    error,
  } = useCloudinaryImageUpload();

  const createPaymentIntent = useMutation<string, Error, void>({
    mutationFn: async () => {
      const paymentIntentRes = await axiosSecure.post<PaymentIntentResponse>(
        "/create-payment-intent",
        { amount: 5 },
      );
      const clientSecret = paymentIntentRes.data.clientSecret;

      if (!clientSecret) {
        throw new Error("Payment client secret was not returned.");
      }

      return clientSecret;
    },
  });

  const saveTransaction = useMutation<
    AxiosResponse<CharityPaymentRequest>,
    Error,
    CharityPaymentRequest
  >({
    mutationFn: async (transactionData: CharityPaymentRequest) => {
      const saveTransactionRes = await axiosSecure.post<CharityPaymentRequest>(
        "/save-transaction",
        transactionData,
      );
      return saveTransactionRes;
    },
  });

  const patchCharityRequest = useMutation<
    AxiosResponse<CharityRolePatchResponse>,
    Error,
    CharityRolePatchPayload
  >({
    mutationFn: async (patchData: CharityRolePatchPayload) => {
      const charityRequestRes =
        await axiosSecure.patch<CharityRolePatchResponse>(
          `/users/role_request/${userEmail}`,
          patchData,
        );
      return charityRequestRes;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo", userEmail] });
      navigate("/");
    },
  });
  const onSubmit = async (formData: RequestCharityRoleForm): Promise<void> => {
    let formattedContact = formData?.organization_contact
      ? formData.organization_contact.trim()
      : "";
    formattedContact = formattedContact.replace(/\D/g, ""); // remove any non-digit
    if (formattedContact.length === 11 && formattedContact.startsWith("0")) {
      formattedContact = "+880" + formattedContact.slice(1);
    } else {
      // Handle invalid or unexpected formats
      throw new Error(
        "Invalid contact number format. Please enter a valid 11 digit bangladeshi number.",
      );
    }

    const file: File | undefined = formData?.organization_logo?.[0];
    let uploadedUrl: string = "";
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Image Missing!",
        text: "Please upload a profile image.",
        showConfirmButton: true,
      });
      return;
    }
    // cloudinary image upload by hook
    try {
      uploadedUrl = await uploadImage(file);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      Swal.fire({
        icon: "error",
        title: "Upload failed!",
        text: message,
        showConfirmButton: true,
        timer: 2500,
      });
      return;
    }

    // stripe payment
    if (!stripe || !elements) {
      Swal.fire({
        icon: "error",
        title: "Stripe is not loaded yet!",
        showConfirmButton: true,
        timer: 1500,
      });
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      Swal.fire({
        icon: "error",
        title: "Card element not found!",
        timer: 1500,
        showConfirmButton: true,
      });
      return;
    }
    try {
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });
      if (paymentMethodError) {
        Swal.fire({
          icon: "error",
          title: "Create payment method failed!",
          text: paymentMethodError.message,
          showConfirmButton: true,
        });
        return;
      }
      if (!paymentMethod) {
        Swal.fire({
          icon: "error",
          title: "Payment method was not created.",
          showConfirmButton: true,
        });
        return;
      }

      // clientsecret
      const clientSecret = await createPaymentIntent.mutateAsync();
      if (!clientSecret) {
        throw new Error("Payment client secret was not returned.");
      }
      // paymentIntent
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: userName,
              email: userEmail,
            },
          },
        });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const transactionData: CharityPaymentRequest = {
          _id: "",
          transaction_id: paymentIntent.id,
          amount: 5,
          currency: "USD",
          email: userEmail,
          user_name: userName,
          organization_name: formData.organization_name,
          organization_email: formData.organization_email,
          organization_contact: formattedContact,
          organization_logo: uploadedUrl,
          purpose: "Charity role request",
          request_time: new Date(),
          status: "Pending",
        };
        // save transaction
        await saveTransaction.mutateAsync(transactionData);
      }

      // PATCH user in DB with organization_name, mission, role
      const patchData: CharityRolePatchPayload = {
        organization_name: formData?.organization_name,
        organization_email: formData?.organization_email,
        organization_contact: formattedContact,
        organization_address: formData?.organization_address,
        organization_logo: uploadedUrl,
        organization_tagline: formData?.organization_tagline,
        mission: formData?.mission,
        transaction_id: paymentIntent?.id, //stripe's id
        amount_paid: 5,
        currency: "USD",
        status: "Pending",
        role: "charity_role_request",
        charity_request_time: new Date(),
      };
      const response = await patchCharityRequest.mutateAsync(patchData);
      if (response.data.userUpdate.modifiedCount > 0) {
        (Swal.fire({
          icon: "success",
          title: "Charity role request submitted successfully.",
          timer: 1500,
        }),
          reset());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment or update failed!",
          showConfirmButton: true,
        });
        navigate("/");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      Swal.fire({
        icon: "error",
        title: "Payment or update failed!",
        text: message,
        showConfirmButton: true,
      });
    }
  };
  return (
    <section className="max-w-4xl mx-auto my-8 bg-white p-6 rounded shadow-lg shadow-gray-600">
      <h2 className="font-semibold text-2xl text-center mb-4">
        Request charity role
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <div>
          <label className="label text-teal-900 font-medium">Name</label>
          <input
            type="text"
            value={userName}
            readOnly
            className="input w-full"
          />
        </div>
        {/* email */}
        <div>
          <label className="label text-teal-900 font-medium">Email</label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="input w-full"
          />
        </div>
        {/* organization name */}
        <div>
          <label className="label text-teal-900 font-medium">
            Organization Name
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Organization Name"
            {...register("organization_name", {
              required: "Organization name is required.",
            })}
          />
          {errors?.organization_name && (
            <p className="text-xs text-red-500">
              {errors.organization_name?.message}
            </p>
          )}
        </div>
        {/* organization email */}
        <div>
          <label className="label text-teal-900 font-medium">
            Organization Email
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Organization Email"
            {...register("organization_email", {
              required: "Organization email is required.",
            })}
          />
          {errors?.organization_email && (
            <p className="text-xs text-red-500">
              {errors.organization_email?.message}
            </p>
          )}
        </div>
        {/* organization contact */}
        <div>
          <label className="label text-teal-900 font-medium">
            Organization Contact
          </label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={11}
            className="input w-full"
            placeholder="Organization Contact"
            {...register("organization_contact", {
              required: "Organization contact is required.",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Please provide 11 digit bangladeshi mobile number.",
              },
            })}
          />
          {errors?.organization_contact && (
            <p className="text-xs text-red-500">
              {errors.organization_contact?.message}
            </p>
          )}
        </div>
        {/* organization address */}
        <div>
          <label className="label text-teal-900 font-medium">
            Organization Address
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Organization address"
            {...register("organization_address", {
              required: "Organization address is required.",
            })}
          />
          {errors?.organization_address && (
            <p className="text-xs text-red-500">
              {errors.organization_address?.message}
            </p>
          )}
        </div>

        {/* charity logo upload */}
        <div>
          <label className="label text-teal-900 font-medium">
            Upload Organization Logo
          </label>
          <input
            type="file"
            accept="image/*"
            className="input w-full"
            placeholder="Organization logo"
            {...register("organization_logo", {
              required: "Organization logo is required.",
            })}
          />
          {errors?.organization_logo && (
            <p className="text-xs text-red-500">
              {errors.organization_logo?.message}
            </p>
          )}
        </div>
        {/* tag line statement */}
        <div>
          <label className="label text-teal-900 font-medium">
            Organization Tag line
          </label>
          <textarea
            rows={1}
            className="textarea w-full"
            placeholder="Organization tag line"
            {...register("organization_tagline", {
              required: "Organization tagline is required",
            })}
          />
          {errors?.organization_tagline && (
            <p className="text-xs text-red-500">
              {errors.organization_tagline?.message}{" "}
            </p>
          )}
        </div>
        {/* mission statement */}
        <div>
          <label className="label text-teal-900 font-medium">
            Mission Statement
          </label>
          <textarea
            rows={3}
            className="textarea w-full"
            placeholder="Write organization mission"
            {...register("mission", {
              required: "Mission statement is required",
            })}
          />
          {errors?.mission && (
            <p className="text-xs text-red-500">{errors.mission?.message} </p>
          )}
        </div>
        {/* stripe card element */}
        <div className="p-4 border rounded">
          <p className="text-lg font-medium mb-3">
            Payment amount:
            <span className="text-green-800 font-semibold ml-2">$5</span>
          </p>
          <CardElement className="p-2 border border-gray-400/50 shadow-md bg-teal-100 min-h-[50px]" />
          {/* Status indicators */}
          <div className="my-4 space-y-1 text-sm text-teal-700 font-medium">
            {createPaymentIntent.isPending && (
              <p>🔄 Creating payment intent...</p>
            )}
            {saveTransaction.isPending && <p>💾 Saving payment details...</p>}
            {patchCharityRequest.isPending && (
              <p>📥 Updating charity request...</p>
            )}
          </div>
          {/* payment  */}
          <button
            type="submit"
            disabled={!stripe || isSubmitting || isPending}
            className="btn bg-teal-700 cursor-pointer w-full text-gray-100 mt-4"
          >
            {isSubmitting ? "Submitting..." : "Pay $5"}
          </button>
          {isPending && (
            <p className="text-blue-500 font-medium">Uploading image...</p>
          )}
          {isError && (
            <p className="text-red-600 text-sm">
              Upload error: {error?.message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default RequestCharityRole;
