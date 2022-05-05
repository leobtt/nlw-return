import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import { theme } from '../../theme'
import { styles } from './styles'

/* import { styles } from './styles.ts' */

export function Widget() {
  return (
    <>
      <TouchableOpacity style={styles.button}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
    </>
  )
}