import { StyleSheet, View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, maxSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../00-helpers/styles'

export default function Menu(props) { 
    const styles = useStyles()
    const deviceSize = useDeviceSize()
    console.log(deviceSize, minSize(DEVICE_SIZES.MD), DEVICE_SIZES.SM)
    return (
        <View style={processStyle(styles.menu__contentWrapper)}>
            <View style={processStyle(styles.menu__contentWrapperLeft)}>
            {
                (DEVICE_SIZES.XS == deviceSize) ? (
                    <Pressable 
                        title={ "Search product" }
                        style={processStyle(styles.menu__pressable)}
                        onPress={() => props.onPress("search")}
                    >   
                    {
                            (DEVICE_SIZES.XS != deviceSize) ? (
                                <Text 
                                    style={processStyle(styles.menu__buttonText)}
                                >
                                    Search product
                                </Text>
                            ) : null
                    }
                        <Ionicons 
                            iconStyle={processStyle(styles.menu__buttonIcon)}
                            name="search"
                            size={18} 
                            />
                    </Pressable>
                ) : null
            }
            </View>
            <View style={processStyle(styles.menu__contentWrapperRight)}>
                <Pressable 
                    title={ "Create product" }
                    style={processStyle(styles.menu__pressable)}
                    onPress={() => props.onPress("create")}
                >   
                    {
                        (DEVICE_SIZES.XS != deviceSize) ? (
                            <Text 
                                style={processStyle(styles.menu__buttonText)}
                            >
                                 Create product
                            </Text>
                        ) : null
                    }
                    <Ionicons 
                        iconStyle={processStyle(styles.menu__buttonIcon)}
                        name="add"
                        size={18} 
                    />
                </Pressable>
                <Pressable 
                    title={ "Remove product" }
                    style={processStyle(styles.menu__pressable)}
                    onPress={() => props.onPress("remove")}
                >
                    {
                        (DEVICE_SIZES.XS != deviceSize) ? (
                            <Text 
                                style={processStyle(styles.menu__buttonText)}
                            >
                                 Remove product
                            </Text>
                        ) : null
                    }
                    <Ionicons 
                        iconStyle={processStyle(styles.menu__buttonIcon)}
                        name="trash-bin"
                        size={18} 
                    />
                </Pressable>
            </View>
            </View>
    )
}

const useStyles = CreateResponsiveStyle({
    menu__contentWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    menu__pressable: {
        flexDirection: "row",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 5,
        border: "2px solid #000",
        padding: 3,
        margin: 5
    },
    menu__pressable: {
        flexDirection: "row",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 5,
        border: "2px solid #000",
        padding: 3,
        margin: 5
    },
    menu__contentWrapperLeft: {
        width: 120,
    },
    menu__contentWrapperRight: {
        flexDirection: "row",
        width: 120,
        justifyContent: "flex-end"
    },
    menu__buttonIcon: {
    },
    menu__buttonText: {

    },
    menu__buttonIcon: {

    },
},
{
    [minSize(DEVICE_SIZES.SM)]: {
        menu__pressable: {
            width: "auto",
            justifyContent: "space-between",
            padding: 7,
        },
        menu__buttonText: {
            marginRight: 3,
        },
    }
});