import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import dashboardNormal from '../../assets/icons/space_dashboard_black_24dp.svg';
import dashboardActive from '../../assets/icons/dashboard-active.svg';
import statisticsNormal from '../../assets/icons/trending_up_black_24dp.svg';
import statisticActive from '../../assets/icons/statistic-active.svg';
import './NavBar.scss';

export default function NavBar() {
    const [status, setStatus] = useState('jobs')

    const handleClick = (e) => {
        setStatus(e.target.id);
    }

    return (
        <div className="navbar">
            <Link to="/" className="navbar__link">
                <div id="jobs" onClick={handleClick} className="navbar__jobs">
                    <img 
                        src={status === 'jobs' ? dashboardActive : dashboardNormal} 
                        alt="space dashboard" 
                        className="navbar__icon"
                    />
                    <p className={`navbar__text ${status === 'jobs' && 'navbar__active'}`}>Jobs</p>
                </div>
            </Link>
            <Link to="/statistics" className="navbar__link">
                <div id="statistics" onClick={handleClick} className="navbar__statistics">
                    <img 
                        src={status === 'statistics' ? statisticActive : statisticsNormal} 
                        alt="Trending upward icon" 
                        className="navbar__icon" 
                    />
                    <p className={`navbar__text ${status === 'statistics' && 'navbar__active'}`}>Statistics</p>
                </div>
            </Link>
            
        </div>
    )
}
