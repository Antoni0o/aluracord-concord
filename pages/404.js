import Head from "next/head";
import { Box, Button, Text } from "@skynexui/components";
import React from "react";

import GetRandomNumber from "../components/GetRandomNumber";
import appConfig from '../config.json';

export default function Custom404() {
  const [background, setBackground] = React.useState('');

  React.useEffect(() => {
    if (!background) {
      setBackground(GetRandomNumber());
    }
  }, [background]);

  return (
    <>
      <Head>
        <title>Concord - Login</title>
      </Head>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >

        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%', maxWidth: '750px',
            padding: '32px', margin: '16px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          <Text tag="h2" variant="heading1" styleSheet={{ marginBottom: '16px', color: appConfig.theme.colors.neutrals["000"], fontSize: '32px' }}>Page Not Found!</Text>
          <Box styleSheet={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Text
              variant="heading1"
              styleSheet={{
                transition: '0.3s ease',
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals["000"],
                fontSize: '128px',
                hover: {
                  transition: '0.3s ease',
                  color: appConfig.theme.colors.primary["500"],
                  cursor: 'default',
                }
              }}
            >4</Text>
            <Text
              variant="heading1"
              styleSheet={{
                transition: '0.3s ease',
                marginBottom: '32px',
                color: appConfig.theme.colors.primary["500"],
                fontSize: '128px',
                hover: {
                  transition: '0.3s ease',
                  cursor: 'default',
                  color: appConfig.theme.colors.neutrals["000"]
                }
              }}
            >0</Text>
            <Text
              variant="heading1"
              styleSheet={{
                transition: '0.3s ease',
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals["000"],
                fontSize: '128px',
                hover: {
                  transition: '0.3s ease',
                  color: appConfig.theme.colors.primary["500"],
                  cursor: 'default',
                }
              }}
            >4</Text>

          </Box>
          <Button
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.primary[500],
              mainColorLight: appConfig.theme.colors.primary[400],
              mainColorStrong: appConfig.theme.colors.primary[600],
            }}
            label="Voltar"
            rounded="full"
            size="xl"
            href="/"
            variant="secondary"
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              border: '3px solid',
              padding: '10px 40px'
            }}
          />
        </Box>
      </Box>
    </>
  )
}