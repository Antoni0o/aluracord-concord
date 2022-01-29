import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import appConfig from '../config.json';
import GetRandomNumber from '../components/GetRandomNumber';
import MessageList from '../components/MessageList';

const supabaseURL = 'https://cszipflqliivofbzdgjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5Njc3NSwiZXhwIjoxOTU4OTcyNzc1fQ.QDuQm7rnpGUL2tU9VIC8XeTYiRIccnDc0ENhNCjb2dM';
const supabaseClient = createClient(supabaseURL, supabaseAnonKey);

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

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', {ascending: false})
      .then(({data}) => {
        setMessageList(data);
      });
  }, []);

  const newMessageHandle = (newMessage) => {
    const message = {
      sender: username,
      text: newMessage
    };

    supabaseClient
      .from('messages')
      .insert([
        message
      ])
      .then(({data}) => {
        setMessageList([
          data[0],
          ...messageList
        ]);
        setMessage('');
      })
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

