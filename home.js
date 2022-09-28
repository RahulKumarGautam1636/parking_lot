import React, { useState, useEffect } from 'react';
import SliderSection from './sliderSection';
import ProfileCard, { PackgeCard, LabTestCard } from './cards';
import axios from 'axios';
import useScript from './utilities';
import $ from 'jquery';
import qs from 'query-string';

function Home(props) {
  // useScript('js/script.js');
  // useScript('js/bootstrap.min.js');
  console.log(qs.parse(props.location.search, { ignoreQueryPrefix: true }));

  const [docList, setDocList] = useState([]);

  useEffect(() => {
    const search = async () => {
    const res = await axios.get('https://dummy.restapiexample.com/api/v1/employees', {});
    if (res) {
      setDocList(res.data.data);
      console.log(res);
    } else {
      alert('Something went wrong, Reload the page.');
    }
    }
    search();
  },[]);

  const renderDocProfiles = () => {
    if (docList.length === 0) {
        return (
          <div style={{"minHeight": "18rem", "display": "grid", "placeItems": "center", "background": "#0000003b"}}>
           <div className="spinner-border text-success" role="status" style={{"width": "3rem", "height": "3rem"}}>
              <span className="visually-hidden">Loading...</span>
           </div>
          </div>
        )
    } else {
      return (
        <SliderSection docList={docList} id="neurology-slider" heading={'Neurology'}>
          <ProfileCard/>
        </SliderSection>
      )
    }
  }

  return (
    <div style={{"backgroundImage": "linear-gradient(#00ffff14, transparent,transparent)"}}>
        <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center">
                        <h1>Search Doctor, Make an Appointment {qs.parse(props.location.search, { ignoreQueryPrefix: true }).qs2}</h1>
                        <p>Discover the best doctors in the city nearest to you.</p>
                    </div>

                    <div className="search-box">
                        <form action="Home/Specialists">
                            <div className="form-group search-info">
                                <input type="text" className="form-control" placeholder="Search Doctors"/>
                                <span className="form-text">Ex : Cardiologist or Dentist etc</span>
                            </div>
                            <button type="submit" className="btn btn-primary search-btn"><i className="fas fa-search"></i> <span>Search</span></button>
                        </form>
                    </div>

                </div>
            </div>
        </section>

        <section className="pb-5">
            <div className="section-header text-center mt-5 mb-4">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>Specialities</h2>
            </div>
            <div className="container-fluid">
            {renderDocProfiles()}




{/*                <SliderSection id="neurology-slider" heading={'Neurology'}>
                    <ProfileCard/>
                </SliderSection>
                <SliderSection id="orthopedic-slider" heading={'Orthopedic'}>
                    <ProfileCard/>
                </SliderSection>
                <SliderSection id="cardiologist-slider" heading={'Cardiologist'}>
                    <ProfileCard/>
                </SliderSection>              */}
            </div>

            <div className="section-header text-center mt-5 mb-4">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>LAB TESTS</h2>
            </div>
            <div className="container-fluid">
{/*                <SliderSection id="labTest-slider" heading={'Lab Tests'}>
                    <LabTestCard/>
                </SliderSection>            */}
            </div>

            <div className="section-header text-center mt-5 mb-4">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>HEALTH PACKAGES</h2>
            </div>
            <div className="container-fluid">
{/*                <SliderSection id="healthPackages-slider" heading={'Health Packages'}>
                    <PackgeCard/>
                </SliderSection>           */}
            </div>
        </section>
    </div>
  );

}

export default Home;


const dummyData = [
  {
    Name: 'John Doe',
    Qualification: 'Enggineer',
    SpecialistDesc: 'Frontend Developer'
  },
  {
    Name: 'Alex haze',
    Qualification: 'Accountant',
    SpecialistDesc: 'Chartered Accountant'
  },

];






/*
 class Home extends React.Component {

  componentDidMount() {
    loadjs('../../public/js/jquery.min.js', function() {
      loadjs('../../public/js/fancybox.umd.js', function() {
        loadjs('../../public/js/script.js');
      });
    });
  }
  render() {
    return (
    <div style={{"backgroundImage": "linear-gradient(#00ffff14, transparent,transparent)"}}>
        <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center">
                        <h1>Search Doctor, Make an Appointment</h1>
                        <p>Discover the best doctors in the city nearest to you.</p>
                    </div>

                    <div className="search-box">
                        <form action="Home/Specialists">
                            <div className="form-group search-info">
                                <input type="text" className="form-control" placeholder="Search Doctors"/>
                                <span className="form-text">Ex : Cardiologist or Dentist etc</span>
                            </div>
                            <button type="submit" className="btn btn-primary search-btn"><i className="fas fa-search"></i> <span>Search</span></button>
                        </form>
                    </div>

                </div>
            </div>
        </section>

        <section className="pb-5">
            <div className="section-header text-center mt-5 mb-4">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>Specialities</h2>
            </div>
            <div className="container-fluid">
                <SliderSection id="urology-slider" heading={'Urology'}>
                    <ProfileCard/>
                </SliderSection>
                <SliderSection id="neurology-slider" heading={'Neurology'}>
                    <ProfileCard/>
                </SliderSection>
                <SliderSection id="orthopedic-slider" heading={'Orthopedic'}>
                    <ProfileCard/>
                </SliderSection>
                <SliderSection id="cardiologist-slider" heading={'Cardiologist'}>
                    <ProfileCard/>
                </SliderSection>
            </div>

            <div className="section-header text-center mt-5 mb-4">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>LAB TESTS</h2>
            </div>
            <div className="container-fluid">
                <SliderSection id="labTest-slider" heading={'Lab Tests'}>
                    <LabTestCard/>
                </SliderSection>
            </div>

            <div className="section-header text-center mt-5 mb-4">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>HEALTH PACKAGES</h2>
            </div>
            <div className="container-fluid">
                <SliderSection id="healthPackages-slider" heading={'Health Packages'}>
                    <PackgeCard/>
                </SliderSection>
            </div>
        </section>
    </div>
  )
  }
}}
*/
