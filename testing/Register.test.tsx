import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import Register from '../app/register/page';
import { registerUser } from '../src/features/auth/authAPI';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../src/features/auth/authAPI', () => ({
  registerUser: vi.fn(),
}));

describe('Register Page', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // gunakan vi bukan jest
  });

  it('melakukan input kolom dan tombol secara benar', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

 it('menampilkan modal jika email salah dan password kurang dari 6 karakter', async () => {
  render(<Register />);
  
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'invalidemail' }, // email tanpa '@'
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: '123' }, // password kurang dari 6 karakter
  });

  fireEvent.submit(screen.getByTestId('register-form'));

  await waitFor(() => {
    expect(screen.getByText(/Buat email dengan benar dan password minimal 6 karakter./i)).toBeInTheDocument();
  });
});


  it('memanggil registerUser pada endpoint jika form valid', async () => {
    const mockedRegisterUser = vi.mocked(registerUser);
    mockedRegisterUser.mockResolvedValueOnce({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'test12' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test12@email.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'test123' },
    });

    fireEvent.submit(screen.getByTestId('register-form'));

    await waitFor(() => {
      expect(mockedRegisterUser).toHaveBeenCalledWith({
        username: 'test12',
        email: 'test12@email.com',
        password: 'test123',
      });
    });
  });
});
