import React from "react";
import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaRegSmileWink,
  FaSyncAlt,
  FaSearch,
  FaUsers,
  FaHeart,
} from "react-icons/fa";

/**
 * NoCharity – polished empty state for when no charity records are found.
 *
 * Props:
 * - onRetry?: () => void    // optional retry action
 * - onExplore?: () => void  // optional explore/redirect action
 */
export default function NoCharity({ onRetry, onExplore }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-50 p-6 sm:p-10 border border-sky-100 shadow-[0_10px_30px_rgba(14,165,233,0.15)]"
        aria-label="No charities found"
      >
        {/* Soft decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-teal-200/30 blur-3xl" />

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 grid place-items-center h-14 w-14 rounded-2xl bg-white/80 backdrop-blur border border-sky-100 shadow-md">
            <FaHandsHelping className="text-sky-500 text-2xl" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              No charities available right now
            </h2>
            <p className="mt-1 text-slate-600">
              We couldn’t find any charity organizations to show. Try refreshing, or explore other sections while we get things ready.
            </p>
          </div>
        </div>

        {/* Helpful actions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ActionCard
            icon={<FaSyncAlt className="text-sky-600" aria-hidden="true" />}
            title="Retry fetching"
            desc="Give it another go—sometimes the network just needs a second."
            actionLabel="Retry"
            onClick={onRetry}
          />
          <ActionCard
            icon={<FaSearch className="text-teal-600" aria-hidden="true" />}
            title="Explore donations"
            desc="Browse available donations while charities get populated."
            actionLabel="Explore"
            onClick={onExplore}
          />
        </div>

        {/* Visual highlights */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          <Badge icon={<FaUsers />} label="Community" />
          <Badge icon={<FaHeart />} label="Impact" />
          <Badge icon={<FaRegSmileWink />} label="Friendly UI" />
        </div>

        {/* Subtle footer note */}
        <p className="mt-6 text-xs text-slate-500">
          Tip: If you’re expecting to see your organization here, make sure your profile is approved and up to date.
        </p>
      </motion.section>
    </div>
  );
}

function ActionCard({ icon, title, desc, actionLabel, onClick }) {
  const isClickable = typeof onClick === "function";
  return (
    <motion.button
      type="button"
      disabled={!isClickable}
      whileHover={isClickable ? { scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`group w-full text-left rounded-2xl border bg-white/70 backdrop-blur p-4 sm:p-5 shadow hover:shadow-lg transition-all ${
        isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-80"
      }`}
      aria-label={title}
    >
      <div className="flex items-start gap-3">
        <div className="grid place-items-center h-11 w-11 rounded-xl bg-slate-50 border">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{desc}</p>
          <span
            className={`mt-3 inline-flex items-center text-sm font-medium ${
              isClickable
                ? "text-sky-700 group-hover:text-sky-900"
                : "text-slate-400"
            }`}
          >
            {actionLabel}
            <svg
              className="ml-1 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function Badge({ icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border bg-white/60 backdrop-blur px-3 py-2 text-slate-700 shadow-sm">
      <span className="text-lg" aria-hidden="true">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
