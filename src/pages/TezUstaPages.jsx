import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icons';
import {
  AvatarStack,
  ButtonLink,
  InputField,
  PrimaryButton,
  SectionHeading,
  SecondaryButton,
  SelectField,
  StatusPill,
  TextareaField,
} from '../components/MobileChrome';
import {
  authBenefits,
  customerActions,
  customerMetrics,
  customerOrders,
  featuredLead,
  landingHeroPreview,
  howItWorks,
  landingStats,
  landingTestimonials,
  landingTrustIndicators,
  masterFilters,
  masterLeads,
  masterMetrics,
  serviceCategories,
  specialists,
  transactions,
  unlockOffer,
  walletStats,
  walletSummary,
} from '../data/mockData';
import {
  MapArtwork,
  PortraitAvatar,
  SupportIllustration,
} from '../components/Illustrations';

function getMasterById(masterId) {
  return specialists.find((master) => master.id === masterId);
}

function RatingStars({ count = 5 }) {
  return (
    <div className="rating-stars" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <Icon key={index} name="star" size={14} />
      ))}
    </div>
  );
}

export function LandingPage() {
  const featuredHeroMaster = getMasterById(landingHeroPreview.specialistId) ?? specialists[0];

  return (
    <div className="page-stack landing-page">
      <section className="hero-grid landing-section" id="landing-top">
        <div className="page-stack hero-copy">
          <StatusPill tone="lime">Uy xizmatlari bozori</StatusPill>
          <SectionHeading
            className="section-heading--hero"
            title={
              <>
                Ustani 1 daqiqada <span className="accent-text">toping</span>
              </>
            }
            description="TezUsta orqali santexnik, elektrik va boshqa tekshirilgan mutaxassislarni bir joydan toping, taqqoslang va tez bog'laning."
          />

          <div className="hero-trust-row">
            {landingTrustIndicators.map((item) => (
              <span key={item.label} className="hero-trust-item">
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </span>
            ))}
          </div>

          <div className="hero-actions hero-actions--landing">
            <ButtonLink to="/login" className="hero-cta-primary">
              Buyurtma berish
            </ButtonLink>
            <ButtonLink to="/master/dashboard" tone="secondary" icon={null} className="hero-cta-secondary">
              Usta sifatida kirish
            </ButtonLink>
          </div>

          <div className="surface-card stats-band">
            {landingStats.map((item) => (
              <article key={item.label} className="stats-band__item">
                <span className="stats-band__icon">
                  <Icon name={item.icon} size={18} />
                </span>
                <div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="surface-card hero-market-card">
            <div className="hero-market-card__profile">
              <div className="hero-market-card__avatar">
                <PortraitAvatar variant={featuredHeroMaster.variant} size={112} />
                <span className="hero-market-card__verified">Tekshirilgan profil</span>
              </div>

              <div className="hero-market-card__details">
                <div className="hero-market-card__rating">
                  <RatingStars />
                  <span>{landingHeroPreview.rating}</span>
                </div>
                <h3>{featuredHeroMaster.name}</h3>
                <p>
                  {featuredHeroMaster.specialty} - {featuredHeroMaster.experience}
                </p>
                <span className="hero-market-card__response">{landingHeroPreview.response}</span>
              </div>
            </div>

            <article className="hero-job-preview">
              <span className="field-block__label">So'rov namunasi</span>
              <h4>{landingHeroPreview.title}</h4>
              <p>{landingHeroPreview.summary}</p>
              <span className="meta-inline">
                <Icon name="calendar" size={14} />
                {landingHeroPreview.meta}
              </span>
            </article>
          </div>

          <div className="surface-card hero-panel__note">
            <StatusPill tone="neutral">Ishonch signali</StatusPill>
            <h3>Har bir profil reyting, tajriba va javob tezligi bilan ko'rsatiladi</h3>
            <p>
              Buyurtma berishdan oldin siz sharhlar, javob bergan vaqt va ustaning faol ishlarini ko'rishingiz mumkin.
            </p>
          </div>
        </div>
      </section>

      <section className="page-stack landing-section" id="services">
        <div className="section-row">
          <SectionHeading
            as="h2"
            className="section-heading--landing"
            eyebrow="Xizmatlar"
            title="Eng ko'p buyurtma qilinadigan yo'nalishlar"
            description="Mijozlar eng ko'p foydalanadigan xizmatlar shu yerda jamlangan."
          />
        </div>
        <div className="service-grid">
          {serviceCategories.map((service) => (
            <Link key={service.title} to="/login" className="surface-card service-card service-card--interactive">
              <span className="service-card__icon">
                <Icon name={service.icon} size={22} />
              </span>
              <h2>{service.title}</h2>
              <p>{service.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-stack landing-section landing-section--testimonials">
        <div className="section-row">
          <SectionHeading
            as="h2"
            className="section-heading--landing"
            eyebrow="Ishonch"
            title="Ishonchli ustalar platformasi"
            description="Mijozlar platforma orqali tez topilgan va ishonch bilan tanlangan ustalar haqida nima deydi."
          />
        </div>
        <div className="testimonial-grid">
          {landingTestimonials.map((testimonial) => (
            <article key={testimonial.name} className="surface-card testimonial-card">
              <div className="testimonial-card__header">
                <div className="testimonial-card__avatar">{testimonial.initials}</div>
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <RatingStars count={testimonial.rating} />
              <p className="testimonial-card__quote">"{testimonial.quote}"</p>
            </article>
          ))}
        </div>
      </section>

      <section className="two-column-grid landing-section" id="how-it-works">
        <div className="surface-card">
          <SectionHeading
            as="h2"
            className="section-heading--landing"
            eyebrow="Jarayon"
            title="Qanday ishlaydi?"
            description="Platforma mijoz va ustani bir joyda uchrashtirish uchun sodda oqimni taklif qiladi."
          />
          <div className="steps-grid">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="step-card">
                <span className="step-card__index">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="page-stack">
            {specialists.slice(0, 2).map((master) => (
              <article key={master.id} className="surface-card mini-master">
                <div className="mini-master__top">
                  <PortraitAvatar variant={master.variant} size={64} />
                  <div>
                  <h3>{master.name}</h3>
                  <p>
                    {master.specialty} - {master.experience}
                  </p>
                </div>
              </div>
              <div className="mini-master__meta">
                <StatusPill tone="neutral" icon="star">
                  {master.rating}
                </StatusPill>
                <span>{master.responseTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing-footer" id="site-footer">
        <div className="landing-footer__grid">
          <div className="landing-footer__brand">
            <Link to="/" className="brand-link">
              TezUsta
            </Link>
            <p>Ustalarni tez va oson topish platformasi</p>
          </div>

          <nav className="landing-footer__nav" aria-label="Footer navigatsiyasi">
            <h3>Havolalar</h3>
            <a href="#landing-top">Bosh sahifa</a>
            <a href="#how-it-works">Qanday ishlaydi</a>
            <Link to="/master/dashboard">Usta bo'lish</Link>
            <a href="#site-footer">Aloqa</a>
          </nav>

          <div className="landing-footer__contact">
            <h3>Aloqa</h3>
            <a href="tel:+998712000000" className="landing-footer__contact-link">
              <Icon name="phone" size={16} />
              <span>+998 71 200 00 00</span>
            </a>
            <a
              href="https://t.me/TezUsta_Bot"
              target="_blank"
              rel="noreferrer"
              className="landing-footer__contact-link"
            >
              <Icon name="telegram" size={16} />
              <span>@TezUsta_Bot</span>
            </a>
            <a href="mailto:info@tezusta.uz" className="landing-footer__contact-link">
              <Icon name="message" size={16} />
              <span>info@tezusta.uz</span>
            </a>
          </div>
        </div>

        <div className="landing-footer__bottom">
          © 2026 TezUsta. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('+998 ');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    const nextOtp = [...otp];
    nextOtp[index] = value.slice(-1);
    setOtp(nextOtp);
  };

  return (
    <div className="auth-page">
      <div className="auth-grid">
        <section className="surface-card auth-panel">
          <SectionHeading
            eyebrow="Kirish"
            title={step === 'phone' ? 'Telefon raqamingizni kiriting' : 'Tasdiqlash kodini kiriting'}
            description={
              step === 'phone'
                ? "Davom etish uchun telefon raqamingizni kiriting."
                : "SMS orqali yuborilgan 4 xonali kodni kiriting."
            }
          />

          {step === 'phone' ? (
            <div className="page-stack">
              <InputField
                label="Telefon raqami"
                icon="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+998 90 123 45 67"
              />
              <PrimaryButton onClick={() => setStep('otp')}>Kodni olish</PrimaryButton>
            </div>
          ) : (
            <div className="page-stack">
              <InputField
                label="Telefon raqami"
                icon="phone"
                value={phone}
                readOnly
              />

              <div className="field-block">
                <span className="field-block__label">Tasdiqlash kodi</span>
                <div className="otp-grid">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      className="otp-input"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(event) => handleOtpChange(index, event.target.value)}
                    />
                  ))}
                </div>
              </div>

              <PrimaryButton onClick={() => navigate('/app/dashboard')} icon={null}>
                Tasdiqlash
              </PrimaryButton>
              <SecondaryButton onClick={() => setStep('phone')}>Raqamni o'zgartirish</SecondaryButton>
            </div>
          )}

          <p className="helper-copy">
            Kodni tasdiqlash orqali siz xizmat qoidalari va foydalanish shartlariga rozilik bildirasiz.
          </p>
        </section>

        <aside className="surface-card auth-aside">
          <div className="artwork-frame">
            <SupportIllustration />
          </div>
          <div className="page-stack">
            <h2>TezUsta bilan buyurtma yuborish tez va aniq</h2>
            <div className="benefit-list">
              {authBenefits.map((benefit) => (
                <div key={benefit.title} className="benefit-item">
                  <span className="benefit-item__icon">
                    <Icon name={benefit.icon} size={18} />
                  </span>
                  <div>
                    <strong>{benefit.title}</strong>
                    <p>{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function UserDashboardPage() {
  return (
    <div className="page-stack">
      <section className="surface-card page-hero">
        <StatusPill tone="lime">Mijoz paneli</StatusPill>
        <SectionHeading
          title="Mening buyurtmalarim"
          description="Faol jarayonlar, kelgan javoblar va tezkor amallar bitta joyda."
        />
        <div className="action-grid">
          {customerActions.map((action) => (
            <Link key={action.to} to={action.to} className="surface-card action-card">
              <span className="action-card__icon">
                <Icon name={action.icon} size={18} />
              </span>
              <h3>{action.title}</h3>
              <p>{action.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="metrics-grid">
        {customerMetrics.map((metric) => (
          <article key={metric.label} className="surface-card metric-card">
            <span className="metric-card__icon">
              <Icon name={metric.icon} size={18} />
            </span>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="page-stack">
          <div className="section-row">
            <h2 className="section-title">Faol buyurtmalar</h2>
            <Link to="/app/masters" className="link-inline">
              Ustalarni ko'rish
            </Link>
          </div>
          <div className="order-list">
            {customerOrders.map((order) => (
              <article key={order.id} className="surface-card order-card">
                <div className="order-card__header">
                  <StatusPill tone={order.statusTone}>{order.status}</StatusPill>
                  <span className="meta-inline">
                    <Icon name="map-pin" size={14} />
                    {order.location}
                  </span>
                </div>
                <h3>{order.title}</h3>
                {order.people ? (
                  <div className="order-card__people">
                    <AvatarStack items={order.people} />
                    <span>{order.detail}</span>
                  </div>
                ) : (
                  <p>{order.detail}</p>
                )}
                <div className="order-card__footer">
                  <span className="meta-inline">
                    <Icon name="calendar" size={14} />
                    {order.meta}
                  </span>
                  <ButtonLink to="/app/masters" tone="secondary" icon={null} className="button--small">
                    Batafsil
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="page-stack">
          <article className="surface-card side-note-card">
            <StatusPill tone="neutral">Bugungi tavsiya</StatusPill>
            <h3>Buyurtmani aniq yozing</h3>
            <p>
              Muammo, manzil va kerakli vaqtni to'liq kiritsangiz, sizga ko'proq mos ustalar tezroq javob beradi.
            </p>
            <ButtonLink to="/app/jobs/new" icon={null}>
              Yangi buyurtma
            </ButtonLink>
          </article>

          <article className="surface-card side-note-card">
            <StatusPill tone="lime">Hamyon</StatusPill>
            <h3>Balansingiz faol</h3>
            <p>Kontaktdan oldin balansni tekshiring va bepul kreditlarni ishlating.</p>
            <ButtonLink to="/app/wallet" tone="secondary" icon={null}>
              Hamyonni ochish
            </ButtonLink>
          </article>
        </aside>
      </section>
    </div>
  );
}

export function CreateJobPage() {
  const navigate = useNavigate();
  const [jobForm, setJobForm] = useState({
    category: 'Santexnika',
    title: '',
    description: '',
    address: 'Toshkent, Yunusobod tumani',
    budget: '150,000 UZS',
  });

  const updateField = (key, value) => {
    setJobForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="form-grid">
      <form
        className="surface-card form-main"
        onSubmit={(event) => {
          event.preventDefault();
          navigate('/app/masters');
        }}
      >
        <div className="page-stack">
          <SectionHeading
            eyebrow="Yangi buyurtma"
            title={
              <>
                Usta kerakmi? <span className="accent-text">Tafsilotlarni qoldiring.</span>
              </>
            }
            description="Muammoni aniq yozing, biz sizga mos ustalarni ko'rsatamiz."
          />

          <SelectField
            label="Xizmat turi"
            value={jobForm.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            <option>Santexnika</option>
            <option>Elektrik</option>
            <option>Mexanik</option>
            <option>Bog'bon</option>
          </SelectField>

          <InputField
            label="Sarlavha"
            value={jobForm.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Masalan: kir yuvish mashinasi ishlamayapti"
          />

          <TextareaField
            label="Muammo tavsifi"
            value={jobForm.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Qisqacha muammo, kerakli vaqt va qo'shimcha izohlarni yozing..."
            rows={5}
          />

          <div className="form-double">
            <InputField
              label="Manzil"
              icon="map-pin"
              value={jobForm.address}
              onChange={(event) => updateField('address', event.target.value)}
            />
            <InputField
              label="Budjet"
              icon="wallet"
              value={jobForm.budget}
              onChange={(event) => updateField('budget', event.target.value)}
            />
          </div>

          <div className="upload-panel">
            <label className="upload-placeholder">
              <input type="file" className="visually-hidden" />
              <Icon name="camera" size={24} />
              <span>Rasm yuklash</span>
              <small>Muammoni tushunish uchun 1-2 ta rasm foydali.</small>
            </label>
            <div className="upload-preview-card">
              <span className="status-pill status-pill--neutral">Namuna</span>
              <p>Buzilgan ulash joyi va suv oqayotgan kran fotosi</p>
            </div>
          </div>

          <div className="map-card">
            <MapArtwork />
          </div>

          <PrimaryButton type="submit">Buyurtmani joylash</PrimaryButton>
        </div>
      </form>

      <aside className="surface-card form-aside">
        <div className="page-stack">
          <h2>Joylashdan oldin tekshirib chiqing</h2>
          <ul className="bullet-list">
            <li>Muammo qachondan beri kuzatilayotganini yozing.</li>
            <li>Joylashuvni aniqlashtiring va kirish imkonini ko'rsating.</li>
            <li>Agar kerak bo'lsa, budjet chegarasini ham kiriting.</li>
          </ul>
          <SecondaryButton onClick={() => navigate('/app/dashboard')} icon={null}>
            Dashboardga qaytish
          </SecondaryButton>
        </div>
      </aside>
    </div>
  );
}

export function ChooseMasterPage() {
  return (
    <div className="page-stack">
      <section className="surface-card job-summary">
        <StatusPill tone="lime">Sizning buyurtmangiz</StatusPill>
        <h2>Yuvish mashinasini ta'mirlash</h2>
        <p>4 ta usta javob berdi. Tajriba, reyting va javob tezligiga qarab tanlang.</p>
      </section>

      <div className="masters-grid">
        {specialists.map((master) => (
          <article key={master.id} className="surface-card master-card">
            <div className="master-card__header">
              <PortraitAvatar variant={master.variant} />
              <div className="master-card__details">
                <div className="rating-badge">
                  <Icon name="star" size={14} />
                  {master.rating}
                </div>
                <h3>{master.name}</h3>
                <p>
                  {master.specialty} - {master.experience}
                </p>
              </div>
            </div>
            <div className="tag-row">
              {master.badges.map((badge, index) => (
                <StatusPill key={badge} tone={index === 0 ? 'neutral' : 'outline'}>
                  {badge}
                </StatusPill>
              ))}
            </div>
            <div className="master-card__meta">
              <span>{master.responseTime}</span>
              <span>{master.completedJobs}</span>
            </div>
            <p className="master-card__note">{master.note}</p>
            <ButtonLink to={`/app/masters/${master.id}/unlock`} icon={null}>
              Tanlash
            </ButtonLink>
          </article>
        ))}
      </div>
    </div>
  );
}

export function UnlockContactPage() {
  const navigate = useNavigate();
  const { masterId } = useParams();
  const master = getMasterById(masterId);

  if (!master) {
    return (
      <section className="surface-card centered-flow">
        <SectionHeading
          title="Usta topilmadi"
          description="Tanlangan profil mavjud emas. Iltimos, ro'yxatga qayting."
        />
        <ButtonLink to="/app/masters" icon={null}>
          Ustalar ro'yxatiga qaytish
        </ButtonLink>
      </section>
    );
  }

  return (
    <div className="unlock-grid">
      <section className="surface-card payment-card">
        <StatusPill tone="neutral">Kontaktni ochish</StatusPill>
        <h1>{master.name} bilan bog'lanish</h1>
        <p>
          Kontakt ma'lumotlarini ko'rish uchun hisobingizdan {unlockOffer.price} yechiladi. Siz
          telefon va messenjerlar orqali bevosita aloqaga chiqasiz.
        </p>

        <div className="payment-summary">
          <div className="soft-row-card">
            <span className="soft-row-card__icon">
              <Icon name="wallet" size={18} />
            </span>
            <div>
              <div className="soft-row-card__title">Mavjud balans</div>
              <div className="soft-row-card__value">{unlockOffer.balance}</div>
            </div>
          </div>

          <div className="bonus-card">
            <span className="bonus-card__icon">
              <Icon name="gift" size={18} />
            </span>
            <div>
              <strong>{unlockOffer.freeCredits}</strong>
              <p>Avval bonus kreditlarni ishlatishingiz ham mumkin.</p>
            </div>
          </div>
        </div>

        <PrimaryButton onClick={() => navigate(`/app/masters/${master.id}/contact`)} icon={null}>
          Tolash va ochish
        </PrimaryButton>
        <ButtonLink to="/app/wallet" tone="secondary" icon="wallet">
          Hamyonni ko'rish
        </ButtonLink>
      </section>

      <aside className="surface-card payment-aside">
        <div className="master-card__header">
          <PortraitAvatar variant={master.variant} />
          <div className="master-card__details">
            <div className="rating-badge">
              <Icon name="star" size={14} />
              {master.rating}
            </div>
            <h3>{master.name}</h3>
            <p>
              {master.specialty} - {master.experience}
            </p>
          </div>
        </div>
        <p className="master-card__note">{master.note}</p>
        <div className="meta-stack">
          <span className="meta-inline">
            <Icon name="clock" size={14} />
            {master.responseTime}
          </span>
          <span className="meta-inline">
            <Icon name="map-pin" size={14} />
            {master.location}
          </span>
        </div>
      </aside>
    </div>
  );
}

export function ContactDetailsPage() {
  const { masterId } = useParams();
  const master = getMasterById(masterId);

  if (!master) {
    return (
      <section className="surface-card centered-flow">
        <SectionHeading
          title="Kontakt topilmadi"
          description="Tanlangan usta uchun ma'lumot mavjud emas."
        />
        <ButtonLink to="/app/masters" icon={null}>
          Ustalar ro'yxatiga qaytish
        </ButtonLink>
      </section>
    );
  }

  return (
    <div className="contact-grid">
      <section className="surface-card contact-profile">
        <div className="master-card__header">
          <PortraitAvatar variant={master.variant} size={88} />
          <div className="master-card__details">
            <StatusPill tone="lime">Kontakt ochildi</StatusPill>
            <h1>{master.name}</h1>
            <p>
              {master.specialty} - {master.experience}
            </p>
          </div>
        </div>
        <p className="master-card__note">{master.note}</p>
        <div className="meta-stack">
          <span className="meta-inline">
            <Icon name="star" size={14} />
            Reyting: {master.rating}
          </span>
          <span className="meta-inline">
            <Icon name="map-pin" size={14} />
            {master.location}
          </span>
          <span className="meta-inline">
            <Icon name="clock" size={14} />
            Ish vaqti: {master.hours}
          </span>
        </div>
      </section>

      <div className="page-stack">
        <article className="surface-card contact-method-card">
          <div>
            <span className="field-block__label">Telefon</span>
            <h3>{master.phone}</h3>
          </div>
          <a href={`tel:${master.phone.replace(/\s+/g, '')}`} className="contact-action">
            Qo'ng'iroq qilish
          </a>
        </article>

        <article className="surface-card contact-method-card">
          <div>
            <span className="field-block__label">Telegram</span>
            <h3>{master.telegram}</h3>
          </div>
          <a href={`https://t.me/${master.telegram.replace('@', '')}`} className="contact-action">
            Ochish
          </a>
        </article>

        <article className="surface-card contact-method-card">
          <div>
            <span className="field-block__label">WhatsApp</span>
            <h3>{master.phone}</h3>
          </div>
          <a href={`https://wa.me/${master.whatsapp.replace('+', '')}`} className="contact-action">
            Yozish
          </a>
        </article>

        <article className="surface-card side-note-card">
          <h3>Keyingi qadam</h3>
          <p>
            Mutaxassis bilan ish vaqti, kelish sanasi va yakuniy narxni bevosita kelishib oling.
          </p>
          <ButtonLink to="/app/dashboard" tone="secondary" icon={null}>
            Dashboardga qaytish
          </ButtonLink>
        </article>
      </div>
    </div>
  );
}

export function WalletPage() {
  return (
    <div className="page-stack wallet-shell">
      <section className="wallet-card">
        <div className="wallet-card__eyebrow">Joriy balans</div>
        <div className="wallet-card__amount">{walletSummary.balance}</div>
        <div className="wallet-card__meta">
          <span>{walletSummary.card}</span>
          <StatusPill tone="dark">{walletSummary.bonus}</StatusPill>
        </div>
      </section>

      <div className="action-row">
        <ButtonLink to="/app/jobs/new" icon="plus">
          Balansni ishlatish
        </ButtonLink>
        <ButtonLink to="/app/dashboard" tone="secondary" icon={null}>
          Buyurtmalarga qaytish
        </ButtonLink>
      </div>

      <section className="metrics-grid">
        {walletStats.map((item) => (
          <article key={item.label} className="surface-card metric-card">
            <span className="metric-card__icon">
              <Icon name={item.icon} size={18} />
            </span>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </article>
        ))}
      </section>

      <section className="surface-card">
        <div className="section-row">
          <h2 className="section-title">Tranzaksiyalar tarixi</h2>
          <StatusPill tone="neutral">Oxirgi 30 kun</StatusPill>
        </div>
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={`${transaction.title}-${transaction.date}`} className="transaction-row">
              <span className="transaction-row__icon">
                <Icon
                  name={transaction.tone === 'positive' ? 'wallet' : 'credit-card'}
                  size={18}
                />
              </span>
              <div className="transaction-row__body">
                <strong>{transaction.title}</strong>
                <small>{transaction.date}</small>
              </div>
              <span className={`transaction-row__amount is-${transaction.tone}`}>
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function MasterDashboardPage() {
  return (
    <div className="page-stack">
      <section className="surface-card page-hero">
        <StatusPill tone="lime">Usta paneli</StatusPill>
        <SectionHeading
          title="Mavjud ishlar"
          description="Hududingizdagi yangi buyurtmalar, narxlar va tezkor javob berish imkoniyati."
        />
      </section>

      <section className="metrics-grid">
        {masterMetrics.map((metric) => (
          <article key={metric.label} className="surface-card metric-card">
            <span className="metric-card__icon">
              <Icon name={metric.icon} size={18} />
            </span>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <div className="filter-row">
        {masterFilters.map((filter, index) => (
          <button key={filter} type="button" className={`filter-chip ${index === 0 ? 'is-active' : ''}`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        <article className="surface-card featured-lead">
          <StatusPill tone="coral">{featuredLead.badge}</StatusPill>
          <h2>{featuredLead.title}</h2>
          <p>{featuredLead.description}</p>
          <div className="meta-stack">
            <span className="meta-inline">
              <Icon name="map-pin" size={14} />
              {featuredLead.location}
            </span>
            <span className="meta-inline">
              <Icon name="clock" size={14} />
              {featuredLead.time}
            </span>
          </div>
          <div className="order-card__footer">
            <strong className="lead-price">{featuredLead.price}</strong>
            <button type="button" className="button button--primary button--small">
              Ariza yuborish
            </button>
          </div>
        </article>

        <aside className="surface-card side-note-card">
          <h3>Leadga tez javob bering</h3>
          <p>
            Birinchi 15 daqiqada javob bergan ustalar ko'proq bog'lanish imkoniyatiga ega bo'ladi.
          </p>
          <ButtonLink to="/app/wallet" tone="secondary" icon={null}>
            Hamyonni ochish
          </ButtonLink>
        </aside>
      </div>

      <div className="job-list">
        {masterLeads.map((job) => (
          <article key={job.id} className="surface-card job-card">
            <div className="job-card__header">
              <StatusPill tone="neutral">{job.category}</StatusPill>
            </div>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <div className="order-card__footer">
              <strong>{job.budget}</strong>
              <button type="button" className="button button--secondary button--small">
                Ariza yuborish
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
