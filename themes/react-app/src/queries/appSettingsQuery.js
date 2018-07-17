import { gql } from "react-apollo"

export const APP_SETTINGS_QUERY = gql`
  query getAppSettings {
    getAppSettings {
      PCMain
      PCLight
      PCDark
      SCMain
      SCLight
      SCDark
      PCContrast
      SCContrast
      ClientLogo
      HappLogo
    }
  }
`
