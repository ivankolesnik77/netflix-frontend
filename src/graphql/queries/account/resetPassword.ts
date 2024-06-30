import { gql } from '@apollo/client'

export const RESET_PASSWORD = gql(`
  mutation ResetPassword($user: ResetPasswordInput!) {
    resetPassword(user: $user) {
      status
    }
  }
`)
