import React from 'react'

type CardProps = {
  title: string
  image: string
  link: string
}

const Card = ({ title, image, link }: CardProps) => {
  return (
    <>
      <section className="card">
        <a href={link}>
          <img className="card-img" src={image} alt={title} />
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
          </div>
        </a>
      </section>
      <style jsx>{`
        .card {
          margin: 30px auto;
          width: 350px;
          background: #fff;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        }
        .card-img {
          border-radius: 12px 12px 0 0;
          max-width: 100%;
          height: auto;
        }
        .card-content {
          padding: 20px;
        }
        .card-title {
          font-size: 20px;
          margin-bottom: 20px;
          text-align: center;
          color: #333;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </>
  )
}

export default Card
