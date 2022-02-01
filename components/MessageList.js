import { Box } from "@skynexui/components";

import appConfig from '../config.json';
import MessageBox from "./MessageBox";

export default function MessageList({messages, user}) {
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
        }}>
        {messages.map((message) => {
          return (
            <MessageBox
              key={message.id}
              message={message}
              username={user}
            />
          )
        })
        }
      </Box>
  )
}