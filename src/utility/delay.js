export default function delay(ms = 2000) {
    // console.log('Kindly remember to remove `sleep`')
    return new Promise(resolve => setTimeout(resolve, ms))
}
