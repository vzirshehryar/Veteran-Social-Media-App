
import { useSelector } from 'react-redux'

function LeftTop() {
	const me = useSelector((state) => state.userId);
	if(!me){
		return <div>Nothing</div>
	}
	const followers = me.followers.length;
	const followings = me.followings.length;
	const stars = me.stars;
	
  return (
    <>
      	<img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-spot-a-fake-online-review-1661334852.jpg?resize=980:*' alt='shery'/>
      	<h4>{me.name}</h4>
		<div className='box'>
			<h5 id='stars'>Stars Count: {stars}</h5>
			<h5>Followings: {followings}</h5>
			<h5>Followers: {followers}</h5>
		</div>
    </>
  )
}

export default LeftTop;
