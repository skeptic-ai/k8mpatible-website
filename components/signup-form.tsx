"use client";
import { useActionState } from "react";
import { EnrollEmail, State } from "./lib/data";

export default function SignupForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(EnrollEmail, initialState);
    return (
        <form className="mx-auto max-w-[400px]" action={formAction} >
            <div className="space-y-5">
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-indigo-200/65"
                        htmlFor="name"
                    >
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input w-full"
                        placeholder="Your full name"
                        required
                        defaultValue=""
                        aria-describedby="name-error"
                    />
                </div>
                <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.name &&
                        state.errors.name.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-indigo-200/65"
                        htmlFor="organization"
                    >
                        Organization Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="organization"
                        name="organization"
                        type="text"
                        className="form-input w-full"
                        placeholder="Your company or organization name"
                        required
                        aria-describedby="organization-error"
                        defaultValue=""
                    />
                </div>
                <div id="organization-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.organization &&
                        state.errors.organization.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-indigo-200/65"
                        htmlFor="email"
                    >
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-input w-full"
                        placeholder="Your email"
                        defaultValue=""
                        required
                        aria-describedby="email-error"
                    />
                </div>
                <div id="email-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.email &&
                        state.errors.email.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
                {/* <div>
                <label
                  className="block text-sm font-medium text-indigo-200/65"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Password (at least 10 characters)"
                />
              </div> */}
            </div>
            <div className="mt-6 space-y-5">
                <button className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                    Register
                </button>
                {/* <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>
              <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                Sign In with Google
              </button> */}
            </div>
        </form>
    )
}