import { Box, Button, Image, Text } from "@skynexui/components";
import { HiTrash } from "react-icons/hi";
import { createClient } from "@supabase/supabase-js";

import useComponentVisibility from "./hooks/useComponentVisibility";
import appConfig from '../config.json';
import { useState } from "react/cjs/react.development";


const supabaseURL = 'https://cszipflqliivofbzdgjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5Njc3NSwiZXhwIjoxOTU4OTcyNzc1fQ.QDuQm7rnpGUL2tU9VIC8XeTYiRIccnDc0ENhNCjb2dM';
const supabaseClient = createClient(supabaseURL, supabaseAnonKey);

export default function MessageBox({ message, username }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisibility(false);
  const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);

  const deleteMessageHandle = (id) => {
    supabaseClient
      .from('messages')
      .delete()
      .match({ 'id': id })
      .then()
  };

  return (
    <div
      key={message.id}
      ref={ref}
      style={{
        position: 'relative'
      }}
    >
      {isComponentVisible &&
        <Box
          styleSheet={{
            zIndex: '1',
            position: 'absolute',
            left: '30px',
            bottom: '10px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '160px',
            height: '160px',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[800]
          }}
        >
          <Image
            alt='Imagem do usuário'
            styleSheet={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'inline-block',
              marginTop: '16px',
              hover: {
                borderColor: appConfig.theme.colors.primary["400"]
              }
            }}
            src={`https://github.com/${message.sender}.png`}
          />
          <Text
            tag="h4"
            styleSheet={{
              fontWeight: 'bold'
            }}
          >
            {message.sender}
          </Text>
          <Button
            href={`https://github.com/${message.sender}`}
            iconName="github"
            label="Visit Github"
            rounded="full"
            styleSheet={{
              backgroundColor: appConfig.theme.colors.primary["700"],
              marginTop: '8px',
              hover: {
                backgroundColor: appConfig.theme.colors.primary["500"]
              },
              focus: {
                backgroundColor: appConfig.theme.colors.primary["800"]
              }
            }}
            onClick={(e) => {
              setIsComponentVisible(false);
            }}
          />
        </Box>
      }
      <Text
        tag="li"
        styleSheet={{
          borderRadius: '5px',
          padding: '6px',
          marginBottom: '12px',
          hover: {
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }
        }}
        onMouseEnter={() => {
          if(username == message.sender) {
            setDeleteButtonVisibility(true)
          }
        }}
        onMouseLeave={() => setDeleteButtonVisibility(false)}
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
                cursor: 'pointer',
                borderColor: appConfig.theme.colors.primary["400"]
              }
            }}
            src={`https://github.com/${message.sender}.png`}
            onClick={(e) => {
              e.preventDefault();
              if (isComponentVisible) {
                setIsComponentVisible(false)
              } else {
                setIsComponentVisible(true)
              }
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
          {deleteButtonVisibility &&
            <Button
              colorVariant="neutral"
              label={<HiTrash />}
              styleSheet={{
                padding: '0 2px',
                marginLeft: 'auto',
                marginRight: '2%'
              }}
              onClick={(e) => {
                deleteMessageHandle(message.id)
              }}
            />
          }
        </Box>
          {
            message.text.startsWith(':sticker:') 
            ? (
              <Image 
              alt="sticker image"
              styleSheet={{
                maxWidth: '248px'
              }}
              src={message.text.replace(':sticker:', '')} />
            )
            : (
              <Text
                className='messageText'
                styleSheet={{
                  width: '700px',
                  wordBreak: 'break-all'
                }}
              >
                {message.text}
              </Text>
            )
          }
      </Text>
    </div>
  );
}