import { View, Text, Image, StyleSheet } from 'react-native'

function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by | Luccas Lombardi</Text>
            <Image
                source={require("../../assets/qr-code.svg")}
                style={{ width: 50, height: 50 }} />
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        marginTop: 50,
        marginBottom: 10,
        alignItems: 'center'
    },
    footerText: {
        color: "#adadad",
        marginBottom: 10
    }
})