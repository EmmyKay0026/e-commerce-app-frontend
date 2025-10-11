import React from "react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl w-full max-w-md p-6 relative animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back 👋</h2>
        <p className="text-gray-600 text-center mb-6">Sign in or create an account</p>

        <form className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#C68311] hover:bg-[#b2740f] text-white rounded-lg py-2 font-semibold">
            Sign In
          </button>
          <button
            type="button"
            className="text-[#C68311] hover:underline"
          >
            Create an account
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
