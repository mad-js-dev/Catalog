import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions,Text, View, Button, Image} from 'react-native';
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, maxSize, minSize } from 'rn-responsive-styles'
import { useSelector , useDispatch } from "react-redux";
import { uploadPicture, updateProduct  } from '../../store/productsSlice'

import { processStyle } from '../00-helpers/styles'

import { Camera } from 'expo-camera';

export default function TakePicture({navigation}) {
    const dispatch = useDispatch()
    const deviceSize = useDeviceSize()
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState((maxSize(DEVICE_SIZES.LG).includes(deviceSize)) ? Camera.Constants.Type.back : Camera.Constants.Type.front );
    console.log((maxSize(DEVICE_SIZES.LG), deviceSize))
    const [status, requestPermission] = Camera.useCameraPermissions();
    const productId = useSelector(state => state.productsList.productId)

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);
    
    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
    }

    const savePicture = async () => {
        const form = new FormData();
        form.append('productId', productId);
        console.log(productId);
        form.append('file', dataURItoBlob(image), productId + ".jpg");
        console.log(form)
        let res1 = await dispatch(uploadPicture(form)).then(async (res) => {
            console.log(res.payload.fileId.filename)

            let res2 = await dispatch(updateProduct({_id: productId, product: {image: res.payload.fileId.filename}})).then((res) => {
                navigation.navigate("Catalog")
            })
        })
    }

    const dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        return new Blob([ia], {type:mimeString});
    }

    return (
        <View style={(image) ? processStyle(styles.takePictureWrapper_open) : processStyle(styles.takePictureWrapper)}>
            <View style={styles.cameraContainer}>
                {hasCameraPermission ?
                    <Camera 
                        ref={ref => setCamera(ref)}
                        style={styles.fixedRatio} 
                        type={type}
                        ratio={'1:1'}
                    useCamera2Api={true} /> :
                    <Text style={styles.fixedRatio} >No access to camera</Text>
                }
                <View style={processStyle(styles.floatingBottomCase)}>
                    <View style={processStyle(styles.btnWrapper)}>
                        <Button style={processStyle(styles.takePicture)} title="Take Picture" onPress={() => takePicture()} />
                    </View>
                </View>
            </View>
            <View style={styles.pictureContainer}>
                {image && <Image source={{uri: image}} style={{flex:1}}/>}
                <View style={processStyle(styles.floatingBottomCase)}>
                    <View style={processStyle(styles.btnWrapper)}>
                        <Button style={processStyle(styles.retakePicture)} title="Re-take Picture" onPress={() => setImage(null)} />
                    </View>
                    <View style={processStyle(styles.btnWrapper)}>
                        <Button style={processStyle(styles.savePicture)} title="Save Picture" onPress={() => savePicture()} />
                    </View>
                </View>
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    takePictureWrapper: {
        width: "200%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    takePictureWrapper_open: {
        width: "200%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "-100%",
    },
    floatingBottomCase: {
        position: "absolute",
        width: "100%",
        bottom: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    btnWrapper: {
        flex: 1,
        marginTop: 20,
    },
    cameraContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: "100%",
        flexDirection: 'column',
        position: "relative",
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1,
        textAlign: "center"
    },
    pictureContainer: {
        width: Dimensions.get('window').width,
        height: "100%",
        position: "relative",
    },
})