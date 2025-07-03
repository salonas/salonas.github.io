import React from 'react'
import { useLanguage } from '../Components/Lang'
import PageLoader from '../Components/PageLoader'
import '../Assets/Skills.scss'

function Skills() {
  const { t } = useLanguage()

  const skillCategories = [
    {
      title: t('skills-languages'),
      className: 'languages',
      skills: [
        { name: t('skill-python'), level: 'intermediate' },
        { name: t('skill-java'), level: 'beginner' },
        { name: t('skill-csharp'), level: 'beginner' },
        { name: t('skill-js'), level: 'beginner' }
      ]
    },
    {
      title: t('skills-technologies'),
      className: 'technologies',
      skills: [
        { name: t('skill-react'), level: 'intermediate' },
        { name: t('skill-node'), level: 'beginner' },
        { name: t('skill-tailwind'), level: 'intermediate' },
        { name: t('skill-htmlcss'), level: 'intermediate' }
      ]
    },
    {
      title: t('skills-creativity'),
      className: 'creativity',
      skills: [
        { name: t('skill-pixelart'), level: 'intermediate' },
        { name: t('skill-uiux'), level: 'intermediate' },
        { name: t('skill-sketching'), level: 'beginner' }
      ]
    },
    {
      title: t('skills-other'),
      className: 'other',
      skills: [
        { name: t('skill-teamwork'), level: 'intermediate' },
        { name: t('skill-problem'), level: 'intermediate' },
        { name: t('skill-selflearning'), level: 'intermediate' }
      ]
    }
  ]

  return (
    <PageLoader>
      <div className="skills-page-root">
        <main>
          <div className="skills-container">
            <section className="skills-main-section animate-item">
              <h2 className="skills-title animate-title">
                {t('skills-title')}
              </h2>
              
              <div className="skills-grid animate-item">
                {skillCategories.map((category, index) => (
                  <div key={index} className={`skill-category ${category.className} animate-card`}>
                    <div className="skill-category-header">
                      <h3 className="skill-category-title animate-title">{category.title}</h3>
                    </div>
                    
                    <div className="skills-list">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="skill-item animate-skill">
                          <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <div className="skill-progress-container">
                              <div className="skill-progress-track">
                                <div 
                                  className={`skill-progress-fill ${skill.level}`}
                                  data-level={skill.level}
                                ></div>
                                <div className="skill-progress-segments">
                                  <div className="progress-segment"></div>
                                  <div className="progress-segment"></div>
                                  <div className="progress-segment"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageLoader>
  )
}

export default Skills
