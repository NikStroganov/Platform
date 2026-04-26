"use client";

export function FlowError({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600">{message}</p>;
}
