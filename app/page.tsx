import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, BarChart3, Shield, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Instant Shortening",
    description:
      "Generate a clean short link in milliseconds. Just paste your URL and go.",
    Icon: Zap,
  },
  {
    title: "Click Analytics",
    description:
      "Track how many times your links are clicked and monitor performance in real time.",
    Icon: BarChart3,
  },
  {
    title: "Secure & Reliable",
    description:
      "Your links are always available and protected — no downtime, no surprises.",
    Icon: Shield,
  },
  {
    title: "Link Management",
    description:
      "Organize, edit, and delete all your short links from one simple dashboard.",
    Icon: Link2,
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className={cn("flex flex-col flex-1 font-sans")}>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32">
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border",
            "bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-8"
          )}
        >
          <Zap className="size-3.5" />
          Fast, reliable link shortening
        </div>

        <h1
          className={cn(
            "max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
            "text-foreground mb-6 leading-tight"
          )}
        >
          Shorten Links,{" "}
          <span className="text-[#6c47ff]">Amplify</span> Your Reach
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground mb-10">
          Create clean, memorable short links in seconds. Track clicks, manage
          your links, and share smarter — all from one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <SignUpButton mode="modal">
            <Button
              className={cn(
                "rounded-full bg-[#6c47ff] text-white hover:bg-[#5a3adb]",
                "h-12 px-6 text-base gap-2"
              )}
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Button>
          </SignUpButton>

          <SignInButton mode="modal">
            <Button
              variant="outline"
              className={cn("rounded-full h-12 px-6 text-base")}
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className={cn("py-16 sm:py-24 px-4 bg-muted/20")}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Everything you need
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Powerful features to help you shorten, share, and track your links
            effortlessly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg",
                    "bg-[#6c47ff]/10 text-[#6c47ff]"
                  )}
                >
                  <feature.Icon className="size-5" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4">
        <div
          className={cn(
            "max-w-2xl mx-auto text-center rounded-2xl",
            "border border-border bg-card p-10"
          )}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join now and start shortening links for free. No credit card
            required.
          </p>
          <SignUpButton mode="modal">
            <Button
              className={cn(
                "rounded-full bg-[#6c47ff] text-white hover:bg-[#5a3adb]",
                "h-12 px-8 text-base"
              )}
            >
              Create Your Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
