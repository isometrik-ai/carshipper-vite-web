import { describe, it, expect } from "vitest";
import { emailValidator } from "./helpers";

describe("emailValidator", () => {
  it("returns true for a valid email address", () => {
    expect(emailValidator("user@example.com")).toBe(true);
    expect(emailValidator("first.last+tag@sub.domain.co")).toBe(true);
  });

  it("returns false for clearly invalid email addresses", () => {
    expect(emailValidator("")).toBe(false);
    expect(emailValidator("plainaddress")).toBe(false);
    expect(emailValidator("no-at-symbol.com")).toBe(false);
    expect(emailValidator("user@")).toBe(false);
    expect(emailValidator("@example.com")).toBe(false);
    expect(emailValidator("user@example")).toBe(false);
  });
});

