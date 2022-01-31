import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../config.json';

import useComponentVisibility from './hooks/useComponentVisibility';

export function SendStickerButton(props) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisibility(false);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
      }}
    >
      <Button
        variant='tertiary'
        styleSheet={{
          padding: '0',
          minWidth: '50px',
          minHeight: '50px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isComponentVisible ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            backgroundColor: 'none',
            filter: 'grayscale(0)',
          },
          focus: {
            backgroundColor: 'none',
            filter: 'grayscale(0)',
          }
        }}
        label="😋"
        size='xl'
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      />
      {isComponentVisible && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            left: '30px',
            bottom: '30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setIsComponentVisible(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflowY: 'scroll',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  }
                }}
              >
                <Image alt="imagem de um sticker" src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </div>
  )
}
