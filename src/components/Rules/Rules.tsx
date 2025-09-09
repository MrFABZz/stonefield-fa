import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import { AlertTriangle, Shield } from 'lucide-react'
import siteConfig from '../../config/site.config.json'

export const Rules = () => {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [showSecondary, setShowSecondary] = useState(false)

  useGSAP(() => {
    // Title animation
    gsap.from(titleRef.current, {
      y: 50,
      duration: 0.6,
      delay: 0.2,
    });
    // Ajoutez ici d'autres animations si besoin
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && containerRef.current?.contains(trigger.trigger as Element)) {
          trigger.kill();
        }
      });
    };
  }, { scope: containerRef });

  // Composant pour chaque règle avec module secondaire animé
  type Rule = {
    id: string | number;
    title: string;
    description: string;
  };
  interface RuleCardProps {
    rule: Rule;
    index: number;
  }
  const RuleCard = ({ rule, index }: RuleCardProps) => {
    return (
      <div
        className="rule-card relative min-h-[120px]"
        onMouseEnter={() => index === 0 ? setShowSecondary(true) : undefined}
        onMouseLeave={() => index === 0 ? setShowSecondary(false) : undefined}
      >
        <div className="card-gta overflow-hidden">
          <div className="flex items-start gap-6">
            {/* Rule Number */}
            <div className="rule-number flex-shrink-0">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-gta-gold/20 to-gta-gold/5 rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bebas text-gta-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
            {/* Rule Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bebas text-white mb-3">
                {rule.title}
              </h3>
              <p className="text-gta-light leading-relaxed mb-4">
                {rule.description}
              </p>
              {/* Warning */}
              <div className="flex items-center gap-2 text-gta-gold/80 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span className="uppercase tracking-wider">
                  LA VIOLATION PEUT ENTRAÎNER L'INTERDICTION
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Module secondaire animé, positionné en overlay */}
        {index === 0 && (
          <div
            className={`absolute left-0 top-full mt-2 w-4/5 bg-gta-dark/90 rounded-lg shadow-lg p-6 transition-all duration-300 z-10 ${showSecondary ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            <h4 className="text-lg font-bebas text-gta-gold mb-2">Exemple RP RDM</h4>
            <p className="text-gta-light text-sm mb-2">
              <strong>Situation :</strong> Un joueur tue un autre sans aucune raison RP (ex : spawn, discussion, sans conflit ou contexte).
            </p>
            <p className="text-gta-light text-sm mb-2">
              <strong>Ce qui est attendu :</strong> Toute action violente doit être justifiée par une situation RP crédible (conflit, règlement de compte, etc.).
            </p>
            <p className="text-gta-light text-sm">
              <strong>Sanction :</strong> RDM répété = ban temporaire ou définitif selon la gravité.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <section ref={containerRef} id="rules" className="relative py-20 bg-gradient-to-b from-gta-black to-gta-graphite">
      <div className="container-gta">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <Shield className="w-16 h-16 text-gta-gold mx-auto mb-4" />
          <h2 className="text-5xl md:text-7xl font-bebas text-white mb-4">
            Règles du serveur
          </h2>
          <p className="text-xl text-gta-light max-w-2xl mx-auto">
            Suivez ces règles pour la meilleure expérience roleplay
          </p>
        </div>

        {/* Rules Grid */}
        <div className="max-w-5xl mx-auto space-y-6">
          {siteConfig.rules.map((rule, index) => (
            <>
              <RuleCard key={rule.id} rule={rule} index={index} />
              {index === 0 && showSecondary && (
                <div className="h-[140px]"></div>
              )}
            </>
          ))}

          {/* Footer Card */}
          <div className="rule-card">
            <div className="card-gta bg-gradient-to-br from-gta-dark to-gta-graphite text-center p-12">
              <AlertTriangle className="w-16 h-16 text-gta-gold mx-auto mb-6" />
              <h3 className="text-3xl font-bebas text-white mb-4">
                Remember
              </h3>
              <p className="text-gta-light mb-8 max-w-2xl mx-auto">
                Breaking any of these rules may result in warnings, temporary bans, 
                or permanent removal from the server. Our admin team reserves the 
                right to take action based on the severity of the violation.
              </p>
              <a 
                href={siteConfig.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gta-gold inline-block"
              >
                Read Full Rulebook on Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}