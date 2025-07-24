const formattedDate=(dateString)=>{
    if(!dateString){
        return null
    }
    const formattedDate=new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
    return formattedDate
}
export default formattedDate