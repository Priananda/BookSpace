import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../app/login/page";
import { useRouter } from "next/navigation";
import { loginUser } from "../src/features/auth/authAPI";
import { setAuthToken } from "../src/utils/cookie";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../src/features/auth/authSlice";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../src/features/auth/authAPI", () => ({
  loginUser: jest.fn(),
}));
jest.mock("../src/utils/cookie", () => ({
  setAuthToken: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Halaman Login", () => {
  const pushMock = jest.fn();
  const dispatchMock = jest.fn();

beforeEach(() => {
  (useRouter as unknown as jest.Mock).mockReturnValue({ push: pushMock });
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  jest.clearAllMocks();
});

  it("menampilkan input email dan password", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("menampilkan modal jika email/password tidak valid", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "pengguna salah dalam menginputkan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "abc" },
    });

    fireEvent.submit(screen.getByTestId("login-test"));

    expect(
      screen.getByText(/Masukan email dan password dengan benar./i)
    ).toBeInTheDocument();
  });

  it("memanggilkan loginUser, setAuthToken, dispatch loginSuccess, dan redirect ke /dashboard jika data valid", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      id: 1,
      email: "pengguna12@example.com",
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "pengguna12@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password12" },
    });

    fireEvent.submit(screen.getByTestId("login-test"));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: "pengguna12@example.com",
        password: "password12",
      });

      const fakeToken = btoa("1:pengguna12@example.com");
      expect(setAuthToken).toHaveBeenCalledWith(fakeToken);
      expect(dispatchMock).toHaveBeenCalledWith(loginSuccess(fakeToken));
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
