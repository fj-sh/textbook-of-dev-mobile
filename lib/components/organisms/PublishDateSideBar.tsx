import React from 'react'
import { Frontmatter } from '../../types/frontmatter'
import { getIso8601, getYYYYMMDD } from '../../utils/date'

interface DateProps {
  frontmatter: Frontmatter
}

const PublishDateSideBar = ({ frontmatter }: DateProps) => {
  return (
    <>
      <div className="Conainer">
        <dl className="DefinitionList_dl">
          <dt className="DefinitionList_dt">
            <span>作成</span>
          </dt>
          <dd className="DefinitionList_dd">
            <span>
              <time dateTime={getIso8601(frontmatter.date)} itemProp="datePublished">
                {getYYYYMMDD(frontmatter.date)}
              </time>
            </span>
          </dd>
        </dl>
        <hr />
        <dl className="DefinitionList_dl">
          <dt className="DefinitionList_dt">
            <span>更新</span>
          </dt>
          <dd className="DefinitionList_dd">
            <span>
              <time
                dateTime={frontmatter.lastUpdated && getIso8601(frontmatter.lastUpdated)}
                itemProp="dateModified"
              >
                {frontmatter.lastUpdated ? getYYYYMMDD(frontmatter.lastUpdated) : <>更新なし</>}
              </time>
            </span>
          </dd>
        </dl>
      </div>
      <style jsx>{`
        /* タブレット縦以上の幅の場合 */
        @media screen and (min-width: 769px) {
          .Conainer {
            margin: 1rem 0.5rem;
          }

          .DefinitionList_dl {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
          }

          .DefinitionList_dt {
            width: 20%;
          }

          .DefinitionList_dd {
            width: 60%;
            text-align: end;
          }
        }
      `}</style>
    </>
  )
}

export default PublishDateSideBar
