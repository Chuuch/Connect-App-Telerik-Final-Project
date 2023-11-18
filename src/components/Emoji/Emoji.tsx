import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const Emoji = () => {
  return (
    <Picker data={data} onEmojiSelect={console.log} />
  )
}