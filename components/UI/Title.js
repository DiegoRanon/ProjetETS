import { View, Text, StyleSheet } from "react-native"

function Title({children}) {
return (
    <View style={styles.root}>
        <Text style={styles.text}>{children}</Text>
    </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    text:{
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Century Gothic",
        padding: 12,
    }
}
)