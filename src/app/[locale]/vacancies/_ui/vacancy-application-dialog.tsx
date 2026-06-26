"use client";

import { Paperclip, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  type FormEvent,
  type RefObject,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";
import formBg from "../_assets/form-bg.webp";
import formImage from "../_assets/form-image.png";
import { submitVacancyApplication } from "../_lib/submit-application";
import type { VacancyApplicationTarget } from "../_lib/vacancies-shared";

type VacancyApplicationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: VacancyApplicationTarget;
};

const fieldClassName =
  "rounded-none border-[#C7C7C7] bg-white px-[30px] text-body text-foreground shadow-[0px_1.85px_3.15px_0px_#0004221C] placeholder:text-[#171717]/40 focus-visible:border-primary focus-visible:ring-primary/20";

const checkboxClassName =
  "mt-0.5 size-[31px] shrink-0 appearance-none border border-[#C7C7C7] bg-white checked:border-primary checked:bg-primary checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%229%22%20viewBox%3D%220%200%2012%209%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M1%204.5L4.5%208L11%201%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat";

type ResumeUploadProps = {
  id: string;
  fileName: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (fileName: string) => void;
  onClear: () => void;
};

function ResumeUpload({
  id,
  fileName,
  inputRef,
  onFileChange,
  onClear,
}: ResumeUploadProps) {
  const t = useTranslations("vacancies.application");
  const tAria = useTranslations("common.aria");

  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className={cn(textBody, "text-[#171717]")}>{t("resumeHint")}</p>
        <span className={cn(textSmall, "shrink-0 text-[#171717]/40")}>
          {t("resumeMaxSize")}
        </span>
      </div>

      <div
        className={cn(
          fieldClassName,
          "flex h-[50px] items-center gap-3 p-0 pl-[30px] pr-3",
        )}
      >
        <input
          ref={inputRef}
          id={id}
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,.rtf"
          className="sr-only"
          onChange={(event) => {
            onFileChange(event.target.files?.[0]?.name ?? "");
          }}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            textBody,
            "min-w-0 flex-1 truncate text-left transition-colors",
            fileName ? "text-[#171717]" : "text-[#171717]/40",
          )}
        >
          {fileName || t("chooseFile")}
        </button>

        {fileName ? (
          <button
            type="button"
            aria-label={tAria("removeFile")}
            onClick={onClear}
            className="flex size-8 shrink-0 items-center justify-center text-[#273A5B] transition-colors hover:text-primary"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            aria-label={tAria("attachResume")}
            onClick={() => inputRef.current?.click()}
            className="flex size-8 shrink-0 items-center justify-center bg-[#273A5B] text-white transition-colors hover:bg-primary"
          >
            <Paperclip className="size-4" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}

export function VacancyApplicationDialog({
  open,
  onOpenChange,
  target,
}: VacancyApplicationDialogProps) {
  const t = useTranslations("vacancies.application");
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [consent, setConsent] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setPhone("");
    setAbout("");
    setConsent(false);
    setResumeName("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitVacancyApplication(formData);

      if (result.ok) {
        onOpenChange(false);
        resetForm();
        return;
      }

      setError(result.error);
    });
  };

  const clearResume = () => {
    setResumeName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[calc(100vh-2rem)] max-w-[calc(100%-2rem)] overflow-y-auto p-0 sm:max-w-[90rem]"
        aria-describedby={undefined}
      >
        <Image
          src={formBg}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 850px"
          className="object-cover opacity-80"
          aria-hidden
        />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_min(589px,42%)]">
          <section className="relative min-h-[620px]">
            <div className="relative z-10 flex flex-col px-8 py-[30px] pr-20">
              <DialogTitle
                className={cn(
                  headingAppearance,
                  "text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] leading-none text-[#171717]",
                )}
              >
                {t("title")}
              </DialogTitle>

              <div className="mt-5 flex flex-col gap-3 border-l-4 border-primary pl-4">
                <div className="flex flex-col gap-1">
                  <span className={cn(textSmall, "text-foreground/50")}>
                    {t("vacancy")}
                  </span>
                  <p className="font-heading text-[22px] font-semibold tracking-[-0.04em] text-[#171717]">
                    {target.title}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className={cn(textSmall, "text-foreground/50")}>
                    {t("category")}
                  </span>
                  <p className={cn(textBody, "text-foreground/85")}>
                    {target.categoryTitle}
                  </p>
                </div>

                {target.subtitle ? (
                  <p className={cn(textBody, "text-foreground/70")}>
                    {target.subtitle}
                  </p>
                ) : null}
              </div>

              <form
                id={formId}
                onSubmit={handleSubmit}
                className="mt-6 flex max-w-[571px] flex-col gap-2.5"
              >
                <input type="hidden" name="vacancyId" value={target.id} />

                <Input
                  id={`${formId}-name`}
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t("namePlaceholder")}
                  className={cn(fieldClassName, "h-[50px]")}
                />

                <Input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={t("phonePlaceholder")}
                  className={cn(fieldClassName, "h-[50px]")}
                />

                <Textarea
                  id={`${formId}-about`}
                  name="about"
                  required
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  placeholder={t("aboutPlaceholder")}
                  className={cn(
                    fieldClassName,
                    "field-sizing-fixed h-[150px] min-h-[150px] resize-none py-3 leading-normal",
                  )}
                />

                <ResumeUpload
                  id={`${formId}-resume`}
                  fileName={resumeName}
                  inputRef={fileInputRef}
                  onFileChange={setResumeName}
                  onClear={clearResume}
                />

                <label
                  htmlFor={`${formId}-consent`}
                  className="mt-2 flex cursor-pointer items-start gap-3"
                >
                  <input
                    id={`${formId}-consent`}
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className={checkboxClassName}
                  />
                  <span
                    className={cn(textSmall, "leading-[22px] text-[#171717]")}
                  >
                    {t("consentPrefix")}{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2"
                    >
                      {t("consentProcessing")}
                    </Link>{" "}
                    {t("consentMiddle")}{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2"
                    >
                      {t("consentPolicy")}
                    </Link>
                  </span>
                </label>

                {error ? (
                  <p className={cn(textSmall, "text-destructive")} role="alert">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="mt-3 h-[65px] w-full max-w-[313px]"
                >
                  <span
                    className={cn(
                      headingAppearance,
                      textBodyLg,
                      "font-semibold text-primary-foreground",
                    )}
                  >
                    {isPending ? t("submitting") : t("submit")}
                  </span>
                </Button>
              </form>
            </div>
          </section>

          <aside className="relative hidden min-h-[620px] lg:block">
            <Image
              src={formImage}
              alt={t("imageAlt")}
              fill
              sizes="589px"
              className="object-cover"
              priority
            />
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
