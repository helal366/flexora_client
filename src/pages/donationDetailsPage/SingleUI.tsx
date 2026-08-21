interface ISingleUIProps{
    label: string;
    value:string
}

const SingleUI = ({ label, value }: ISingleUIProps) => {
  if (!value) {
    return null;
  }
  return (
    <p className="text-teal-800 text-[15px]">
      <span className="font-semibold italic">{label} : </span> {value}
    </p>
  );
};

export default SingleUI;