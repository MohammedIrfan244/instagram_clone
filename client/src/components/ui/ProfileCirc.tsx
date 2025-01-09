import { useEffect, useState } from "react"
import axiosInstance from "../../utilities/axiosInstance"
import axiosErrorManager from "../../utilities/axiosErrorManager"
import { useNavigate } from "react-router-dom";


interface ProfileCircProps {
    username: string;
}

function ProfileCirc({ username }: ProfileCircProps): JSX.Element {
    const [profile, setProfile] = useState<string>('')
    const [loading,setLoading]=useState<boolean>(false)
    const navigate = useNavigate()


    const fetchProfile = async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/user/profile_pic/${username}`)
            setProfile(response.data.profile)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(axiosErrorManager(error))
        }
    }

    useEffect(() => {
        fetchProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="w-8 h-8 overflow-hidden hover:cursor-pointer rounded-full" onClick={() => navigate(`/${username}`)} >
            {loading?<span className="spinner"/>:<img src={profile} alt="Profile" />}
        </div>
    )
}

export default ProfileCirc
