import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-[#151815] md:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-3 w-3 bg-[#8BCB55]" aria-hidden="true" />
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#777E77]">
          SCREENER.SI
        </p>
      </div>

      <h1 className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
        Privacy Policy
      </h1>

      <div className="mt-10 space-y-8 text-base leading-8 text-[#151815]">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">What information is collected</h2>
          <p>
            We collect the email address submitted through the early-access form. We may also store
            the date of signup and the source of the signup, such as the coming-soon landing page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Why email addresses are collected</h2>
          <p>
            Email addresses are collected to contact people about launch updates, product readiness,
            and important news related to Screener.si. We do not use this information for unrelated
            marketing or third-party promotions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">How signup information is stored</h2>
          <p>
            Signup data is stored in a secure Supabase database with access restricted through
            database permissions and row-level security policies. Credentials are kept on the server,
            not in the browser bundle.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">How users can request removal</h2>
          <p>
            If you want your email address removed from future launch updates, contact the operator
            at hello@screener.si and request removal. We will remove your record from the signup
            list as soon as practicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p>
            For privacy questions or removal requests, email hello@screener.si.
          </p>
        </section>
      </div>

      <div className="mt-12 flex items-center gap-3 text-sm text-[#777E77]">
        <Link href="/" className="font-medium text-[#151815] underline decoration-[#8BCB55] underline-offset-2">
          Return home
        </Link>
      </div>
    </main>
  );
}
