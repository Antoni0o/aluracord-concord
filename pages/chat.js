import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi'

import appConfig from '../config.json';
import GetRandomNumber from '../components/GetRandomNumber';

export default function ChatPage() {
  const username = 'antoni0o';
  const [background, setBackground] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (!background) {
      setBackground(GetRandomNumber());
    }
  }, [background]);

  const newMessageHandle = (newMessage) => {
    const message = {
      id: messageList.length + 1,
      sender: username,
      text: newMessage
    };

    setMessageList([
      message,
      ...messageList
    ]);

    setMessage('');
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList messages={messageList} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '5px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
            }}
          >
            <TextField
              className='formBox'
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={message}
              onChange={(e) => {
                const { value } = e.target;
                setMessage(value);
              }}
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if(message.length >= 1) {
                    newMessageHandle(message);
                  }
                }
              }}
            />
            <Button
              colorVariant="positive"
              label="Enviar"
              rounded="none"
              styleSheet={{
                fontWeight: 'bold',
                padding: '8px 32px',
                borderRadius: '5px',
                backgroundColor: appConfig.theme.colors.primary[600],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
              onClick={(e) => {
                e.preventDefault();
                if(message.length >= 1) {
                  newMessageHandle(message);
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='negative'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  console.log('MessageList', props.messages);
  return (
    <Box
      tag="ul"
      className='chatBox'
      styleSheet={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Image
                alt='Imagem do usuário'
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${message.sender}.png`}
              />
              <Text tag="strong">
                {message.sender}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
              <Button
                colorVariant="neutral"
                label={<HiTrash/>}
                styleSheet={{
                  padding: '2px 4px',
                  marginLeft: 'auto',
                  marginRight: '2%'
                }}
                onClick={(e) => {
                  props.messages.filter((message) => {
                    
                  })
                }}
              />
            </Box>
            <Text
              className='messageText'
              styleSheet={{
                width: '700px',
                wordBreak: 'break-all'
              }}
            >
              {message.text}
            </Text>
          </Text>
        );
      })}
    </Box>
  )
}