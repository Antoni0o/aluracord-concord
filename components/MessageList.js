import { Box, Button, Image, Text } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { HiTrash } from "react-icons/hi";

import appConfig from '../config.json';

const supabaseURL = 'https://cszipflqliivofbzdgjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5Njc3NSwiZXhwIjoxOTU4OTcyNzc1fQ.QDuQm7rnpGUL2tU9VIC8XeTYiRIccnDc0ENhNCjb2dM';
const supabaseClient = createClient(supabaseURL, supabaseAnonKey);

export default function MessageList({messages}) {
  const deleteMessageHandle = (id) => {
    supabaseClient
      .from('messages')
      .delete()
      .match({ 'id': id })
      .then()
  };

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
      {messages &&
      messages.map((message) => {
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
                  hover: {
                    borderColor: appConfig.theme.colors.primary["400"]
                  }
                }}
                src={`https://github.com/${message.sender}.png`}
                onClick={() => {
                  console.log('clicou')
                }}
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
                  e.preventDefault();
                  deleteMessageHandle(message.id)
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