import { useParams } from 'react-router-dom'
const Productscreen = () => {
    const params = useParams()
    const { slug } = params
    return (
        <div>{slug}</div>
    )
}
export default Productscreen