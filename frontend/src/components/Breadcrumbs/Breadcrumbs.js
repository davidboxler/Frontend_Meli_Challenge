import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ categories }) => {
  return (
    <section className="main-container">
      <div className="breadcrumbs-row">
        <section className="breadcrumbs">
          <Link className='btn-volver' to={'/'}>Volver</Link>
          {categories?.map((category) => {
            return (
              <React.Fragment key={category.id}>
                <span className="breadcrumbItem">
                  {category.name}
                </span>
                <MdKeyboardArrowRight className="breadcrumbs-arrow-right" />
              </React.Fragment>
            )
          })}
        </section>
        <ul className="share-or-sell">
          <li>Compartir</li>
          <li>Vender uno igual</li>
        </ul>
      </div>
    </section>
  )
}

export default Breadcrumbs