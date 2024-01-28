import { Pressable, StyleSheet } from "react-native"
import {Ionicons} from '@expo/vector-icons'

function IconButton({icon, color, onPress}) {
    return (<Pressable onPress={onPress} style={({pressed}) => [styles.iconContainer, pressed && styles.pressed, {backgroundColor: color}]}>
        <Ionicons name={icon} size={40} color={color}/>
    </Pressable>)
}

export default IconButton

const styles = StyleSheet.create({
    iconContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: '#ccc',
        marginRight: 5,
    },
    pressed: {
        opacity: 0.25
    }
})

