import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuoteForm from "../QuoteForm";
import React from "react"; // Required if not using automatic JSX runtime

// 1. Fixed Mock: next/navigation needs to return an object with the hook
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

// 2. Fixed Mock: Explicitly handle any types for mock props
vi.mock("@/components/ui/customPhoneNumber/phoneInput", () => ({
  __esModule: true,
  // Added explicit React.ChangeEvent type or any to avoid 'any' error
  default: ({ onPhoneNumberChanges }: { onPhoneNumberChanges: (val: any) => void }) => (
    <input
      data-testid="mock-phone-input"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onPhoneNumberChanges?.({
          mobile: e.target.value,
          isValid: true,
        })
      }
    />
  ),
}));

// The rest of your mocks remain the same...
vi.mock("@/api/quoteForm", () => ({
  useQuoteForm: () => ({
    data: {
      data: {
        form_config: {
          button_texts: {
            next_button: "Next",
            submit_button: "Get My Quote",
          },
          steps: [
            {
              step_key: "contact",
              fields: [
                { field_key: "email", label: "Email", is_required: true },
                { field_key: "first_name", label: "First name", is_required: true },
                { field_key: "last_name", label: "Last name", is_required: true },
              ],
            },
          ],
        },
      },
    },
    isLoading: false,
  }),
}));

vi.mock("../VehicleSelector", () => ({
  VehicleSelector: () => null,
  isVehicleComplete: () => true,
  getVehicleDisplayName: () => "Vehicle",
}));

vi.mock("@/services/quote-services", () => ({
  CreateNewQuotePostAPI: vi.fn(),
}));

describe("QuoteForm handleContactChange behavior (via UI)", () => {
  it("sets and clears email validation error when typing into email field", async () => {
    render(<QuoteForm />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // 3. Changed findByText to getByText or used await correctly
    // findByText is async and should be awaited
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });

    await waitFor(() => {
      expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
    });
  });

  it("clears first and last name errors when user types values", async () => {
    render(<QuoteForm />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    const submitButton = screen.getByRole("button", { name: /get my quote/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });

    await waitFor(() => {
      expect(screen.queryByText(/first name is required/i)).toBeNull();
      expect(screen.queryByText(/last name is required/i)).toBeNull();
    });
  });
});
