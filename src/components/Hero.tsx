import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Hero = () => {
  const router = useRouter();

  //

  return (
    <div className="hero">
      {/* hero carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src="/images/hero9.svg"
              className="d-block w-100"
              alt="hero-images"
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <div className="carousel-item">
            <Image
              src="/images/hero8.svg"
              className="d-block w-100"
              alt="hero-images"
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <div className="carousel-item">
            <Image
              src="/images/hero7.svg"
              className="d-block w-100"
              alt="hero-images"
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <div className="carousel-item">
            <Image
              src="/images/hero6.svg"
              className="d-block w-100"
              alt="hero-images"
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <div className="carousel-item">
            <Image
              src="/images/hero5.svg"
              className="d-block w-100"
              alt="hero-images"
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <div className="contents">
            <h1>Make Your Home a Haven</h1>
            <p>
              Explore curated collection of home decor, get inspired by latest
              trends and create your unique style
            </p>
            <button onClick={() => router.push("/product")}>
              Explore All Interior Designs{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
