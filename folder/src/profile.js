import {Link} from 'react-router-dom'
import Navigation from './navigation.js'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Profile() {
    return(
        <div>
            <Navigation />
			<div className="flex-c-row for-account-page">
		<div className="flex-c-col">
			<div className="container account-page-container border border-5">
				<div className="right-side">
					<i className="bi bi-file-person"></i>
					<h2 className="name-account">Name</h2>
                    <Link to="/" className='btn btn-default border w-50 logout-button btn'>Log Out</Link>
				</div>
				<div className="left-side">
					<h2 className="information-title">Information</h2>
					<h2 className="email-title">Email</h2>
					<h2 className="user-email">myEmail</h2>
				</div>
			</div>
		</div>
			
		</div>
			
		</div>
    )
}
/*
<Link to="/" className='btn btn-default border w-50 bg-light rounded-0 text-decoration-none'>Log Out</Link>
*/