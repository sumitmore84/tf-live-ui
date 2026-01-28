import React from 'react'
import {
  HowItWorksUI,
  HeroUI,
  Reviews,
  SearchBar,
  TopArtists,
  TrendingPackages,
  UpcomingPackages,
  WhyTravelWithUs,
  TravelForEventsUI
} from "@/Home/Sections"
const HomeUI = () => {
  return (
    <>
      <section className='section-container'>
        <SearchBar />
      </section>
      <section className='section-container'>
        <HeroUI />
      </section>
      <section className='section-container'>
        <TravelForEventsUI />
      </section>
      <section className='section-container'>
        <TopArtists />
      </section>
      <section className='section-container'>
        <UpcomingPackages />
      </section>
      <section className='section-container'>
        <WhyTravelWithUs />
      </section>
      <section className='section-container'>
        <HowItWorksUI />
      </section>
      <section className='section-container'>
        <Reviews />
      </section>
    </>
  )
}

export default HomeUI