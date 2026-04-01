"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { addCommentAction } from "@/lib/actions";
import { Avatar } from "@/components/ui";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "7px 16px",
        background: pending ? "var(--accent-light)" : "var(--accent)",
        color: pending ? "var(--accent-text)" : "#fff",
        border: "none",
        borderRadius: "var(--radius-md)",
        fontSize: 13,
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
      }}
    >
      {pending ? "Posting…" : "Comment"}
    </button>
  );
}

export function CommentForm({ taskId }: { taskId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const boundAction = addCommentAction.bind(null, taskId);
  const [state, dispatch] = useFormState(boundAction, null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      textareaRef.current?.focus();
    }
  }, [state]);

  return (
    <form ref={formRef} action={dispatch}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Current user avatar */}
        <Avatar name="Sarah Chen" size={28} />

        <div style={{ flex: 1 }}>
          <textarea
            ref={textareaRef}
            name="message"
            placeholder="Write a comment…"
            rows={3}
            style={{
              width: "100%",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "10px 12px",
              fontSize: 13,
              color: "var(--text-primary)",
              background: "var(--bg)",
              fontFamily: "inherit",
              lineHeight: 1.6,
              resize: "none",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />

          {/* Validation error */}
          {state?.success === false && state.errors?.message && (
            <p style={{ fontSize: 12, color: "var(--status-blocked-text)", marginTop: 4 }}>
              {state.errors.message[0]}
            </p>
          )}
          {state?.success === false && state.errors?._form && (
            <p style={{ fontSize: 12, color: "var(--status-blocked-text)", marginTop: 4 }}>
              {state.errors._form[0]}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}
