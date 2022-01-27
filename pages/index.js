import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import Title from '../components/Title';
import appConfig from '../config.json';

export default function PaginaInicial() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [background, setBackground] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    if(username.length >= 2) {
      fetch(`https://api.github.com/users/${username}`)
      .then(async (res) => {
        return await res.json();
      })
      .then((res) => {
        setUser(res);
        if(!res.avatar_url) {
          const user = {
            avatar_url: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
          }
          setUser(user)
        }
      })
    }
  }, [username]);

  useEffect(() => {
    const URLs = [
      "https://i0.wp.com/www.toppapeldeparede.com.br/wp-content/uploads/2021/04/50-Minimalist-Desktop-Wallpapers-and.png?fit=1200%2C675&ssl=1",
      "https://wallpaperaccess.com/full/84248.png",
      "https://www.pixel4k.com/wp-content/uploads/2019/03/scenery-digital-art-4k_1551642030.jpg",
      "https://images.hdqwalls.com/download/my-secret-alone-time-sea-shore-clouds-silence-digital-art-4k-5l-3840x2400.jpg",
      "https://wallpaperaccess.com/full/1127017.jpg",
      "https://images.hdqwalls.com/wallpapers/sky-blue-clouds-digital-art-4k-pc.jpg",
      "https://wallpaperaccess.com/full/3997508.jpg",
      "https://cdn.wallpapersafari.com/86/45/fv3WCq.jpg",
      "https://images.wallpapersden.com/image/download/cyrodiil-pixel-art_a2loameUmZqaraWkpJRobWllrWdma2U.jpg"
    ];
    
    const randomNumber = Math.floor(Math.random() * URLs.length) - 1;

    if(!background){
      setBackground(URLs[randomNumber < 0 ? randomNumber + 1 : randomNumber]);
    }
  }, [background]);

  return (
    <>
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
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '750px',
            padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '16px',
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if(user.id) {
                router.push('/chat');
              }
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300], fontSize: '16px' }}>
              {appConfig.name}
            </Text>

            <TextField
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.neutrals['500'],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                }
              }}
              fullWidth
              hasLabel={false}
              label="Label"
              rounded="none"
              size="lg"
              value={username}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                setUsername(value);
              }}
            />
            <Button
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              fullWidth
              label="Entrar"
              rounded="none"
              size="xl"
              type="submit"
              variant="secondary"
              styleSheet={{
                color: appConfig.theme.colors.neutrals["000"],
                border: '3px solid'
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '300px',
              padding: '32px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[900],
              flex: 1,
              minHeight: '340px',
              maxHeight: '340px'
            }}
          >
            <Image
              alt='Perfil do usuário'
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username === "" || username.length <= 2 ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" : user.avatar_url}
            />
            {username &&
              <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '6px 16px',
                fontSize: '16px',
                minHeight: '32px',
                maxHeight: '32px'
              }}
              >
                {username}
              </Text>
            }
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}