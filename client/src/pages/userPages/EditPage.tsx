import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import axiosInstance from '../../utilities/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../redux/userSlice';
import axiosErrorManager from '../../utilities/axiosErrorManager';
import { openProfileModal } from '../../redux/commonSlice';
import ProfilePicture from '../../popups/ProfilePictureUpdatePopup';

function EditPage() {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {profileModal}=useSelector((state:RootState)=>state.common)

  const [formData, setFormData] = useState({
    bio: currentUser?.bio || '',
    gender: currentUser?.gender || '',
    customGender: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
      customGender: value === 'Custom' ? prevData.customGender : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(formData)
    try {
      const dataToSubmit = {
        ...formData,
        gender: formData.gender === 'Custom' ? formData.customGender : formData.gender,
      };
      console.log(dataToSubmit)
      const response = await axiosInstance.post('user/user_update', dataToSubmit);
      dispatch(setCurrentUser(response.data.userDetail));
      navigate(`/${response.data.userDetail.username}`);
    } catch (error) {
      setError('An error occurred while updating the profile.');
      console.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ps-[300px] w-full min-h-screen bg-black text-white">
      <h1 className="text-lg mt-10 font-bold mb-4">Edit Profile</h1>
      <div className="flex items-center bg-[#262626] w-[700px] justify-between h-[100px] px-4 rounded-xl my-6">
        <div className="flex items-center gap-5 text-sm">
        <img
          src={currentUser?.profile}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">{currentUser?.username}</p>
          <p>{currentUser?.fullname}</p>
        </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-1 text-xs font-semibold rounded-md" onClick={()=>dispatch(openProfileModal())}>Change Profile</button>
      </div>
      <form onSubmit={handleSubmit} className="w-[400px] space-y-4">
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-5">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            required
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="w-[700px] p-2 border-gray-700 border bg-black text-white rounded-md"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium mb-5">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleGenderChange}
            className="w-[700px] p-2 border border-gray-700 bg-black text-white rounded-md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        {formData.gender === 'Custom' && (
          <div>
            <label htmlFor="customGender" className="block text-sm font-medium mb-1">
              Custom Gender
            </label>
            <input
              id="customGender"
              name="customGender"
              type="text"
              value={formData.customGender}
              onChange={handleChange}
              placeholder="Enter your custom gender"
              className="w-[700px] border bg-black p-2 border-gray-700 text-white rounded-md"
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-md"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Submit'}
        </button>
      </form>
{profileModal && <ProfilePicture />}
    </div>
  );
}

export default EditPage;
