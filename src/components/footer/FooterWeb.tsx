import * as React from 'react'
import { useGesture } from '@use-gesture/react'
import { animated, useSpring, useSprings } from '@react-spring/web'
import { styled } from './style/stitches.config.ts'
import Hamburger from 'hamburger-react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
interface FooterProps{
  status: number
}
const BUTTON_SIZE = 56

// 0: 비로그인, 1: 소비자, 2: 광고주
const footerList = [["", "map", "login"], ["", "flyer", "map", "setting"], ["", "flyer", "qr", "map", "setting"]];

const FooterWeb: React.FC<FooterProps> = (props) => {
  // 로그인 구현시 로그인 정보를 불러와 status에 담아준다.
  // 0: 비로그인, 1: 소비자, 2: 광고주
  const [status, setStatus] = useState(0);
  const buttonRef = React.useRef<HTMLDivElement>(null!)
  const avatarRefs = React.useRef<HTMLDivElement[]>([])
  const avatarRefInitialPositions = React.useRef<number[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null!)
  const [isOpen, setOpen] = useState(false);
  const isVisible = React.useRef(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setStatus(props.status);
  }, [props.status, status]);

  const [{ x, y, opacity }, api] = useSpring(
    () => ({
      x: 0,
      y: 0,
      opacity: 0,
    }),
    []
  )

  const [avatarSprings, avatarApi] = useSprings(
    footerList[status].length,
    _ => ({
      y: 0,
      boxShadow: `0px 3px 8px 2px rgba(0, 108, 58,${0.2 * 1})`
    }),
    []
  )

  React.useLayoutEffect(() => {
    if (avatarRefInitialPositions.current.length === 0 || avatarRefInitialPositions.current.length !== avatarRefs.current.length) {
      const { y: buttonY } = buttonRef.current.getBoundingClientRect()
      avatarRefInitialPositions.current = avatarRefs.current.map(node => buttonY - node.getBoundingClientRect().y)
      avatarRefInitialPositions.current[0] = -64;
      avatarRefInitialPositions.current[1] = -128;
      avatarRefInitialPositions.current[2] = -192;
    }

    avatarApi.start(i => ({
      y: avatarRefInitialPositions.current[i],
      immediate: true,
    }))
  containerRef.current.style.display = "fixed";

  }, [status])

  const backgroundTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>()
  const avatarTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

  const bindGestures = useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          setOpen(true);
          if (backgroundTimeoutRef.current) {
            clearTimeout(backgroundTimeoutRef.current)
          }
          if (avatarTimeoutRef.current) {
            clearTimeout(avatarTimeoutRef.current)
          }

          isVisible.current = true

          api.start({
            opacity: 1,
          })

          avatarApi.start({
            y: 0,
          })
        } else {
          setOpen(false);
          backgroundTimeoutRef.current = setTimeout(() => {
            api.start({
              opacity: 0,
            })
          }, 500)

          avatarTimeoutRef.current = setTimeout(() => {
            avatarApi.start(i => ({
              y: avatarRefInitialPositions.current[i],
              onRest: () => {
                isVisible.current = false
              },
            }))
          }, 100)
        }
      },
    }
  )

  const { onPointerEnter, onPointerLeave, onPointerDown, ...restGestures } = bindGestures();
  const clickAvartar = (index: number) => {
    if (isOpen){
      if(status === 1 || status === 2 || footerList[status][index] !== "setting"){
        navigate(`/${footerList[status][index]}`);
      }else{
        navigate(`/login`);
      }
    }
  }

  const handlePointerDown = (isBackground: boolean) => (e: React.PointerEvent<HTMLElement>) => {
    if (isBackground && !isVisible.current) {
      return
    }

    if (onPointerDown) {
      onPointerDown(e)
    }
  }

  return (
    <>
      <BlurredBackground
        ref={containerRef}
        onPointerLeave={onPointerLeave}
        onPointerDown={handlePointerDown(true)}
        {...restGestures}
        style={{
          x,
          y,
        }}>
        <FloatingButton
          ref={buttonRef}
          onPointerEnter={onPointerEnter}
          onPointerDown={handlePointerDown(false)}
          {...restGestures}
          style={{
            boxShadow: opacity.to(_ => `0px 3px 8px 2px rgba(0, 108, 58,${0.2 * 1})`),
            zIndex: 5
          }}>
            <div>
            <Hamburger rounded color="#006C3A" toggled={isOpen} />
            </div>
        </FloatingButton>
        {avatarSprings.map((springs, index) => (
          <AvatarIcon
            key={index}
            ref={ref => (avatarRefs.current[index] = ref!)}
            onClick={()=>clickAvartar(index)}
            css={{
              backgroundColor: 'white',
              backgroundImage: 'url(/public/icons/footerIcon/green'+ (footerList[status][index] === "" ? "home" : footerList[status][index]) +'.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: 4 - index,
            }}
            style={springs}
          />
        ))}

      </BlurredBackground>
    </>
  )
}

const BlurredBackground = styled(animated.div, {
  position: 'fixed',
  transform: 'translateY(-50%)',
  padding: 12,
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'center',
  touchAction: 'none',
  top: 20,
  left: 'calc(50% + 384px)',
})

const AvatarIcon = styled(animated.div, {
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: '50%',
  mx: 4,
  cursor: 'pointer',
})

const FloatingButton = styled(animated.div, {
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: '50%',
  border: 'none',
  position: 'relative',
  backgroundClip: 'content-box',
  zIndex: 0,
  touchAction: 'none',

  '&:focus-visible': {
    outlineOffset: 2,
    outline: '#569AFF99 auto 6px',
  },

  '& > div': {
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
})

export default FooterWeb;
