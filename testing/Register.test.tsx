import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../app/register/page";
import { useRouter } from "next/navigation";
import { registerUser } from "../src/services/auth/authAPI";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../src/features/auth/authAPI", () => ({
  registerUser: jest.fn(),
}));

describe("Halaman Register", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("menampilkan input username, email, dan password", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  it("menampilkan modal jika email/password tidak valid", () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "pengguna salah dalam menginputkan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "abc" },
    });

    fireEvent.submit(screen.getByTestId("register-test"));

    expect(
      screen.getByText(/Buat email dengan benar dan password minimal 6 karakter./i)
    ).toBeInTheDocument();
  });

  it("memanggilkan registerUser dan redirect ke /login jika data valid", async () => {
    (registerUser as jest.Mock).mockResolvedValue({});

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "pengguna12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "pengguna12@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password12" },
    });

    fireEvent.submit(screen.getByTestId("register-test"));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        username: "pengguna12",
        email: "pengguna12@example.com",
        password: "password12",
      });
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });
});
