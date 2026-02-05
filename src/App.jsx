import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Users, Award, Shield, Upload, CheckCircle, Eye, Clock, AlertCircle, Menu, X, LogOut, Bell, Search, Filter, FileText, Calendar, MapPin, Phone, Mail, Camera, Globe, Flag } from 'lucide-react';

// Color Palette - Saffron, White, Green (Indian Flag Colors)
const colors = {
  saffron: '#FF9933',
  saffronLight: '#FFB366',
  saffronDark: '#E67300',
  green: '#138808',
  greenLight: '#1AAF0D',
  greenDark: '#0D5C06',
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  gray: '#6B7280',
  grayLight: '#E5E7EB',
  grayDark: '#374151',
};

// Logo Component
const Logo = ({ size = 60 }) => (
  <div className="flex items-center gap-3">
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors.saffron} 0%, #FFD700 50%, ${colors.saffron} 100%)`,
        boxShadow: '0 4px 15px rgba(255, 153, 51, 0.4)'
      }}
    >
      <svg viewBox="0 0 100 100" width={size * 0.7} height={size * 0.7}>
        {/* Sun rays */}
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M50,50 L${50 + 45 * Math.cos((i * 30 * Math.PI) / 180)},${50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}`}
            stroke={colors.saffronDark}
            strokeWidth="3"
            opacity="0.6"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        {/* Inner circle */}
        <circle cx="50" cy="50" r="35" fill="url(#sunGradient)" />
        {/* Yoga pose silhouette */}
        <path
          d="M50,25 C48,28 46,35 50,40 C54,35 52,28 50,25 M50,40 L50,60 M50,45 L40,55 M50,45 L60,55 M50,60 L42,75 M50,60 L58,75"
          stroke={colors.saffronDark}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <radialGradient id="sunGradient">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor={colors.saffron} />
          </radialGradient>
        </defs>
      </svg>
    </div>
    <div>
      <h1 className="text-xl font-bold" style={{ color: colors.saffronDark }}>World Yogasanas</h1>
      <p className="text-sm" style={{ color: colors.green }}>Championship 2026</p>
    </div>
  </div>
);

// Navigation Component
const Navigation = ({ currentScreen, setCurrentScreen, isAdmin = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userScreens = [
    { id: 'start', label: 'Start', icon: Flag },
    { id: 'login', label: 'Login', icon: User },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'role', label: 'Role Details', icon: Award },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'terms', label: 'Terms', icon: CheckCircle },
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'status', label: 'Status', icon: Clock },
  ];

  const adminScreens = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: Shield },
    { id: 'admin-review', label: 'Review', icon: Eye },
  ];

  const screens = isAdmin ? adminScreens : userScreens;

  return (
    <nav style={{ backgroundColor: colors.white, borderBottom: `3px solid ${colors.saffron}` }} className="shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo size={45} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setCurrentScreen(screen.id)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: currentScreen === screen.id ? colors.saffron : 'transparent',
                  color: currentScreen === screen.id ? colors.white : colors.grayDark,
                }}
              >
                <screen.icon className="inline w-4 h-4 mr-1" />
                {screen.label}
              </button>
            ))}
          </div>

          {/* Mode Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen(isAdmin ? 'start' : 'admin-dashboard')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ backgroundColor: colors.green, color: colors.white }}
            >
              {isAdmin ? 'User Mode' : 'Admin Mode'}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: colors.saffron }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => { setCurrentScreen(screen.id); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-lg mb-1"
                style={{
                  backgroundColor: currentScreen === screen.id ? colors.saffron : colors.offWhite,
                  color: currentScreen === screen.id ? colors.white : colors.grayDark,
                }}
              >
                <screen.icon className="inline w-4 h-4 mr-2" />
                {screen.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Progress Stepper Component
const ProgressStepper = ({ currentStep, totalSteps = 8 }) => {
  const steps = ['Start', 'Login', 'Profile', 'Role', 'Docs', 'Terms', 'Preview', 'Status'];

  return (
    <div className="w-full py-4 px-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: index < currentStep ? colors.green : index === currentStep ? colors.saffron : colors.grayLight,
                  color: index <= currentStep ? colors.white : colors.gray,
                  boxShadow: index === currentStep ? `0 0 0 4px ${colors.saffronLight}40` : 'none'
                }}
              >
                {index < currentStep ? <CheckCircle size={20} /> : index + 1}
              </div>
              <span
                className="text-xs mt-2 hidden sm:block font-medium"
                style={{ color: index <= currentStep ? colors.saffronDark : colors.gray }}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className="flex-1 h-1 mx-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: index < currentStep ? colors.green : colors.grayLight }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Card Component
const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`rounded-2xl shadow-lg p-6 ${className}`}
    style={{ backgroundColor: colors.white, ...style }}
  >
    {children}
  </div>
);

// Button Component
const Button = ({ children, variant = 'primary', onClick, disabled = false, className = '', icon: Icon }) => {
  const variants = {
    primary: { backgroundColor: colors.saffron, color: colors.white, border: 'none' },
    secondary: { backgroundColor: colors.white, color: colors.saffron, border: `2px solid ${colors.saffron}` },
    success: { backgroundColor: colors.green, color: colors.white, border: 'none' },
    outline: { backgroundColor: 'transparent', color: colors.grayDark, border: `2px solid ${colors.grayLight}` },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.02]'} ${className}`}
      style={variants[variant]}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

// Input Component
const Input = ({ label, type = 'text', placeholder, required = false, icon: Icon, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2" style={{ color: colors.grayDark }}>
      {label} {required && <span style={{ color: colors.saffron }}>*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: colors.gray }} />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200"
        style={{
          borderColor: colors.grayLight,
          paddingLeft: Icon ? '45px' : '16px',
        }}
        onFocus={(e) => e.target.style.borderColor = colors.saffron}
        onBlur={(e) => e.target.style.borderColor = colors.grayLight}
      />
    </div>
  </div>
);

// Select Component
const Select = ({ label, options, required = false, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2" style={{ color: colors.grayDark }}>
      {label} {required && <span style={{ color: colors.saffron }}>*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200 bg-white"
      style={{ borderColor: colors.grayLight }}
      onFocus={(e) => e.target.style.borderColor = colors.saffron}
      onBlur={(e) => e.target.style.borderColor = colors.grayLight}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// Screen 1: Start Screen
const StartScreen = ({ onNext }) => {
  const [role, setRole] = useState('');
  const [origin, setOrigin] = useState('');

  const roles = [
    { id: 'athlete', label: 'Athlete', icon: Users, desc: 'Participate in yoga competitions' },
    { id: 'coach', label: 'Coach', icon: Award, desc: 'Train and guide athletes' },
    { id: 'judge', label: 'Judge', icon: Eye, desc: 'Evaluate performances' },
    { id: 'support', label: 'Support Staff', icon: Shield, desc: 'Manager, Physio, Doctor, Masseur' },
  ];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: colors.saffronDark }}>Welcome to Registration</h2>
          <p style={{ color: colors.gray }}>World Yogasanas Championship • June 4-8, 2026</p>
        </div>

        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.grayDark }}>
            <Flag className="inline mr-2" style={{ color: colors.saffron }} size={20} />
            Select Your Origin
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'national', label: 'National', desc: 'Indian Participant' },
              { id: 'international', label: 'International', desc: 'Foreign Participant' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setOrigin(item.id)}
                className="p-4 rounded-xl border-2 text-left transition-all duration-200"
                style={{
                  borderColor: origin === item.id ? colors.saffron : colors.grayLight,
                  backgroundColor: origin === item.id ? `${colors.saffron}10` : colors.white,
                }}
              >
                <Globe className="mb-2" size={24} style={{ color: origin === item.id ? colors.saffron : colors.gray }} />
                <div className="font-semibold" style={{ color: colors.grayDark }}>{item.label}</div>
                <div className="text-sm" style={{ color: colors.gray }}>{item.desc}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.grayDark }}>
            <User className="inline mr-2" style={{ color: colors.saffron }} size={20} />
            Select Your Role
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className="p-4 rounded-xl border-2 text-left transition-all duration-200"
                style={{
                  borderColor: role === r.id ? colors.green : colors.grayLight,
                  backgroundColor: role === r.id ? `${colors.green}10` : colors.white,
                }}
              >
                <r.icon className="mb-2" size={24} style={{ color: role === r.id ? colors.green : colors.gray }} />
                <div className="font-semibold" style={{ color: colors.grayDark }}>{r.label}</div>
                <div className="text-sm" style={{ color: colors.gray }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!role || !origin}
            icon={ChevronRight}
          >
            Continue to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

// Screen 2: OTP Login Screen
const LoginScreen = ({ onNext, onBack }) => {
  const [step, setStep] = useState('input');
  const [method, setMethod] = useState('email');

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-md mx-auto">
        <ProgressStepper currentStep={1} />

        <Card className="mt-6">
          <div className="text-center mb-6">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${colors.saffron}20` }}
            >
              <Shield size={32} style={{ color: colors.saffron }} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: colors.grayDark }}>Secure Login</h2>
            <p style={{ color: colors.gray }}>Verify your identity with OTP</p>
          </div>

          {step === 'input' ? (
            <>
              <div className="flex gap-2 mb-6">
                {['email', 'mobile'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className="flex-1 py-2 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: method === m ? colors.saffron : colors.offWhite,
                      color: method === m ? colors.white : colors.gray,
                    }}
                  >
                    {m === 'email' ? <Mail className="inline mr-2" size={16} /> : <Phone className="inline mr-2" size={16} />}
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>

              <Input
                label={method === 'email' ? 'Email Address' : 'Mobile Number'}
                type={method === 'email' ? 'email' : 'tel'}
                placeholder={method === 'email' ? 'your@email.com' : '+91 98765 43210'}
                required
                icon={method === 'email' ? Mail : Phone}
              />

              <Button variant="primary" onClick={() => setStep('otp')} className="w-full mt-4">
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <p className="text-center mb-6" style={{ color: colors.gray }}>
                Enter the 6-digit code sent to your {method}
              </p>

              <div className="flex gap-2 justify-center mb-6">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 focus:outline-none"
                    style={{ borderColor: colors.grayLight }}
                    onFocus={(e) => e.target.style.borderColor = colors.saffron}
                    onBlur={(e) => e.target.style.borderColor = colors.grayLight}
                  />
                ))}
              </div>

              <Button variant="primary" onClick={onNext} className="w-full">
                Verify & Continue
              </Button>

              <button
                className="w-full mt-4 text-center text-sm"
                style={{ color: colors.saffron }}
              >
                Resend OTP (00:30)
              </button>
            </>
          )}
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back</Button>
        </div>
      </div>
    </div>
  );
};

// Screen 3: Basic Profile Screen
const ProfileScreen = ({ onNext, onBack }) => {
  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={2} />

        <Card className="mt-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.grayDark }}>
            <User className="inline mr-2" style={{ color: colors.saffron }} />
            Basic Profile
          </h2>

          {/* Photo Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-dashed"
                style={{ borderColor: colors.saffron, backgroundColor: colors.offWhite }}
              >
                <Camera size={40} style={{ color: colors.gray }} />
              </div>
              <button
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.saffron }}
              >
                <Upload size={20} style={{ color: colors.white }} />
              </button>
            </div>
          </div>
          <p className="text-center text-sm mb-6" style={{ color: colors.gray }}>
            Upload a passport-size photo (JPG/PNG, max 2MB)
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Enter first name" required icon={User} />
            <Input label="Last Name" placeholder="Enter last name" required icon={User} />
            <Input label="Date of Birth" type="date" required icon={Calendar} />
            <Select
              label="Gender"
              required
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
            />
            <Input label="Email" type="email" placeholder="your@email.com" required icon={Mail} />
            <Input label="Phone / WhatsApp" type="tel" placeholder="+91 98765 43210" required icon={Phone} />
          </div>

          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${colors.green}10`, border: `1px solid ${colors.green}30` }}>
            <h4 className="font-semibold mb-3" style={{ color: colors.greenDark }}>
              <Globe className="inline mr-2" size={18} />
              Identity Details (National)
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Aadhaar Number" placeholder="XXXX XXXX XXXX" required />
              <Select
                label="State / UT"
                required
                options={[
                  { value: 'delhi', label: 'Delhi' },
                  { value: 'maharashtra', label: 'Maharashtra' },
                  { value: 'karnataka', label: 'Karnataka' },
                ]}
              />
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: colors.offWhite }}>
            <h4 className="font-semibold mb-3" style={{ color: colors.grayDark }}>
              <Phone className="inline mr-2" size={18} />
              Emergency Contact
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Contact Name" placeholder="Full name" required />
              <Input label="Contact Phone" type="tel" placeholder="+91 98765 43210" required />
              <Input label="Relationship" placeholder="e.g., Parent, Spouse" />
            </div>
          </div>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back</Button>
          <div className="flex gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary" onClick={onNext} icon={ChevronRight}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Screen 4: Role Details Screen
const RoleScreen = ({ onNext, onBack }) => {
  const [selectedRole] = useState('athlete');

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={3} />

        <Card className="mt-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.grayDark }}>
            <Award className="inline mr-2" style={{ color: colors.saffron }} />
            {selectedRole === 'athlete' ? 'Athlete Event Entry' : 'Role Details'}
          </h2>

          {selectedRole === 'athlete' ? (
            <>
              <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${colors.saffron}10`, border: `1px solid ${colors.saffron}30` }}>
                <p style={{ color: colors.saffronDark }}>
                  <AlertCircle className="inline mr-2" size={18} />
                  Select your competition category. Age group will be validated based on your DOB.
                </p>
              </div>

              <Select
                label="Event Type / Discipline"
                required
                options={[
                  { value: 'traditional', label: 'Traditional Yogasanas' },
                  { value: 'artistic', label: 'Artistic Yogasanas' },
                  { value: 'rhythmic', label: 'Rhythmic Yogasanas' },
                ]}
              />

              <Select
                label="Category"
                required
                options={[
                  { value: 'individual', label: 'Individual' },
                  { value: 'pair', label: 'Pair' },
                  { value: 'group', label: 'Group (3-5 members)' },
                ]}
              />

              <Select
                label="Age Group"
                required
                options={[
                  { value: 'sub-junior', label: 'Sub-Junior (Under 14)' },
                  { value: 'junior', label: 'Junior (14-17)' },
                  { value: 'senior', label: 'Senior (18-35)' },
                  { value: 'master', label: 'Master (35+)' },
                ]}
              />

              <div className="p-4 rounded-xl mt-6" style={{ backgroundColor: colors.offWhite }}>
                <h4 className="font-semibold mb-3" style={{ color: colors.grayDark }}>
                  <Users className="inline mr-2" size={18} />
                  Team Members (for Pair/Group)
                </h4>
                <p className="text-sm mb-4" style={{ color: colors.gray }}>
                  Add team members using their email or Registration ID
                </p>
                <div className="flex gap-2">
                  <Input label="" placeholder="Email or Registration ID" className="flex-1 mb-0" />
                  <Button variant="secondary" className="mt-0">+ Add</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Input label="Certificate Number" placeholder="Enter certificate number" required />
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Level"
                  required
                  options={[
                    { value: 'national', label: 'National' },
                    { value: 'international', label: 'International' },
                  ]}
                />
                <Select
                  label="Grade"
                  required
                  options={[
                    { value: 'a', label: 'Grade A' },
                    { value: 'b', label: 'Grade B' },
                    { value: 'c', label: 'Grade C' },
                  ]}
                />
              </div>
              <Input label="Issuing Authority" placeholder="Enter issuing organization" />
            </>
          )}
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back</Button>
          <div className="flex gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary" onClick={onNext} icon={ChevronRight}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Screen 5: Documents Screen
const DocumentsScreen = ({ onNext, onBack }) => {
  const documents = [
    { id: 'id', label: 'ID Proof (Aadhaar / Passport)', required: true, status: 'pending' },
    { id: 'photo', label: 'Passport Size Photo', required: true, status: 'uploaded' },
    { id: 'certificate', label: 'Certification Document', required: false, status: 'pending' },
    { id: 'medical', label: 'Medical Fitness Certificate', required: false, status: 'pending' },
  ];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={4} />

        <Card className="mt-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.grayDark }}>
            <FileText className="inline mr-2" style={{ color: colors.saffron }} />
            Document Upload
          </h2>

          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${colors.green}10`, border: `1px solid ${colors.green}30` }}>
            <p style={{ color: colors.greenDark }}>
              <CheckCircle className="inline mr-2" size={18} />
              Accepted formats: PDF, JPG, PNG (Max 5MB per file)
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl border-2 transition-all duration-200"
                style={{
                  borderColor: doc.status === 'uploaded' ? colors.green : colors.grayLight,
                  backgroundColor: doc.status === 'uploaded' ? `${colors.green}05` : colors.white,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium" style={{ color: colors.grayDark }}>
                      {doc.label}
                    </span>
                    {doc.required && (
                      <span className="ml-2 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${colors.saffron}20`, color: colors.saffron }}>
                        Required
                      </span>
                    )}
                    {doc.status === 'uploaded' && (
                      <p className="text-sm mt-1" style={{ color: colors.green }}>
                        <CheckCircle className="inline mr-1" size={14} />
                        document_photo.jpg uploaded
                      </p>
                    )}
                  </div>
                  <Button
                    variant={doc.status === 'uploaded' ? 'secondary' : 'primary'}
                    className="text-sm py-2"
                    icon={Upload}
                  >
                    {doc.status === 'uploaded' ? 'Replace' : 'Upload'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back</Button>
          <div className="flex gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary" onClick={onNext} icon={ChevronRight}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Screen 6: Terms Screen
const TermsScreen = ({ onNext, onBack }) => {
  const [accepted, setAccepted] = useState({ terms: false, declaration: false, data: false });

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={5} />

        <Card className="mt-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.grayDark }}>
            <CheckCircle className="inline mr-2" style={{ color: colors.saffron }} />
            Terms & Declarations
          </h2>

          <div className="space-y-4">
            {[
              {
                id: 'terms',
                title: 'Terms & Conditions',
                content: 'I agree to abide by the rules and regulations of the World Yogasanas Championship 2026, including all competition guidelines, code of conduct, and anti-doping policies.'
              },
              {
                id: 'declaration',
                title: 'Health Declaration',
                content: 'I declare that I am physically fit to participate in the championship and have no medical conditions that would prevent safe participation. I understand that participation is at my own risk.'
              },
              {
                id: 'data',
                title: 'Data Consent',
                content: 'I consent to the collection, storage, and processing of my personal data for the purpose of registration, accreditation, and event management. I understand my data will be handled in accordance with privacy regulations.'
              },
            ].map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border-2"
                style={{
                  borderColor: accepted[item.id] ? colors.green : colors.grayLight,
                  backgroundColor: accepted[item.id] ? `${colors.green}05` : colors.white,
                }}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted[item.id]}
                    onChange={() => setAccepted({ ...accepted, [item.id]: !accepted[item.id] })}
                    className="mt-1 w-5 h-5 rounded"
                    style={{ accentColor: colors.green }}
                  />
                  <div>
                    <span className="font-semibold" style={{ color: colors.grayDark }}>{item.title}</span>
                    <p className="text-sm mt-1" style={{ color: colors.gray }}>{item.content}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back</Button>
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!Object.values(accepted).every(Boolean)}
            icon={ChevronRight}
          >
            Continue to Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

// Screen 7: Preview Screen
const PreviewScreen = ({ onNext, onBack }) => {
  const sections = [
    {
      title: 'Basic Profile',
      data: [
        { label: 'Name', value: 'Akash Rathore' },
        { label: 'DOB', value: '15 March 1995' },
        { label: 'Gender', value: 'Male' },
        { label: 'Email', value: 'akash.rathore7704@gmail.com' },
        { label: 'Phone', value: '+91 98765 43210' },
        { label: 'Nationality', value: 'Indian' },
      ]
    },
    {
      title: 'Event Entry',
      data: [
        { label: 'Discipline', value: 'Traditional Yogasanas' },
        { label: 'Category', value: 'Individual' },
        { label: 'Age Group', value: 'Senior (18-35)' },
      ]
    },
    {
      title: 'Documents',
      data: [
        { label: 'ID Proof', value: '✓ Uploaded' },
        { label: 'Photo', value: '✓ Uploaded' },
      ]
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={6} />

        <Card className="mt-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.grayDark }}>
            <Eye className="inline mr-2" style={{ color: colors.saffron }} />
            Review Your Application
          </h2>

          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${colors.saffron}10`, border: `1px solid ${colors.saffron}30` }}>
            <p style={{ color: colors.saffronDark }}>
              <AlertCircle className="inline mr-2" size={18} />
              Please review all details carefully before submitting. You won't be able to edit after submission unless requested by admin.
            </p>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold" style={{ color: colors.grayDark }}>{section.title}</h3>
                <button className="text-sm" style={{ color: colors.saffron }}>Edit</button>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.offWhite }}>
                {section.data.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: colors.grayLight }}>
                    <span style={{ color: colors.gray }}>{item.label}</span>
                    <span className="font-medium" style={{ color: colors.grayDark }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back</Button>
          <Button variant="success" onClick={onNext} icon={CheckCircle}>
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
};

// Screen 8: Status Screen
const StatusScreen = ({ onBack }) => {
  const [status] = useState('submitted'); // submitted, under-review, approved, rejected, correction

  const statusConfig = {
    submitted: { icon: Clock, color: colors.saffron, label: 'Submitted', message: 'Your application has been submitted successfully and is awaiting review.' },
    'under-review': { icon: Eye, color: colors.saffron, label: 'Under Review', message: 'Your application is currently being reviewed by our verification team.' },
    approved: { icon: CheckCircle, color: colors.green, label: 'Approved', message: 'Congratulations! Your application has been approved. You will receive your accreditation details soon.' },
    rejected: { icon: X, color: '#EF4444', label: 'Rejected', message: 'Unfortunately, your application has been rejected. Please see the reason below.' },
    correction: { icon: AlertCircle, color: colors.saffron, label: 'Correction Required', message: 'Please update the highlighted sections and resubmit your application.' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(180deg, ${colors.offWhite} 0%, ${colors.white} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={7} />

        <Card className="mt-6 text-center">
          <div
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: `${config.color}20` }}
          >
            <StatusIcon size={48} style={{ color: config.color }} />
          </div>

          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.grayDark }}>
            Application {config.label}
          </h2>

          <div className="p-4 rounded-xl mb-6 inline-block" style={{ backgroundColor: colors.offWhite }}>
            <span className="text-sm" style={{ color: colors.gray }}>Registration ID</span>
            <p className="text-xl font-bold" style={{ color: colors.saffron }}>WYC2026-ATH-00001</p>
          </div>

          <p className="mb-6" style={{ color: colors.gray }}>{config.message}</p>

          <div className="p-4 rounded-xl text-left" style={{ backgroundColor: colors.offWhite }}>
            <h4 className="font-semibold mb-3" style={{ color: colors.grayDark }}>Timeline</h4>
            <div className="space-y-3">
              {[
                { date: 'Feb 5, 2026 10:30 AM', action: 'Application Submitted', done: true },
                { date: 'Feb 5, 2026 11:00 AM', action: 'Documents Received', done: true },
                { date: 'Pending', action: 'Verification Review', done: false },
                { date: 'Pending', action: 'Final Approval', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.done ? colors.green : colors.grayLight }}
                  />
                  <div className="flex-1">
                    <span className="text-sm" style={{ color: item.done ? colors.grayDark : colors.gray }}>
                      {item.action}
                    </span>
                    <span className="text-xs ml-2" style={{ color: colors.gray }}>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-6 flex justify-center gap-4">
          <Button variant="secondary" icon={FileText}>Download Receipt</Button>
          <Button variant="primary" icon={Mail}>Contact Support</Button>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Screen
const AdminDashboard = ({ setCurrentScreen }) => {
  const stats = [
    { label: 'Total Applications', value: '1,247', change: '+23 today', color: colors.saffron },
    { label: 'Pending Review', value: '156', change: '12% of total', color: colors.saffronDark },
    { label: 'Approved', value: '1,024', change: '82% approval', color: colors.green },
    { label: 'Rejected', value: '67', change: '5% rejection', color: '#EF4444' },
  ];

  const recentApplications = [
    { id: 'WYC2026-ATH-00125', name: 'Priya Sharma', role: 'Athlete', status: 'pending', time: '5 min ago' },
    { id: 'WYC2026-COA-00034', name: 'Rajesh Kumar', role: 'Coach', status: 'under-review', time: '15 min ago' },
    { id: 'WYC2026-JUD-00012', name: 'Anita Desai', role: 'Judge', status: 'approved', time: '1 hour ago' },
    { id: 'WYC2026-ATH-00124', name: 'Amit Singh', role: 'Athlete', status: 'correction', time: '2 hours ago' },
  ];

  const statusColors = {
    pending: colors.saffron,
    'under-review': colors.saffronDark,
    approved: colors.green,
    rejected: '#EF4444',
    correction: '#F59E0B',
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: colors.offWhite }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.grayDark }}>Admin Dashboard</h1>
            <p style={{ color: colors.gray }}>World Yogasanas Championship 2026 • Registration Management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon={Bell}>Notifications</Button>
            <Button variant="primary" icon={FileText}>Export Data</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: colors.gray }}>{stat.label}</p>
                  <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs mt-1" style={{ color: colors.gray }}>{stat.change}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Users size={24} style={{ color: stat.color }} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: colors.gray }} />
                <input
                  type="text"
                  placeholder="Search by name, ID, or email..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border-2"
                  style={{ borderColor: colors.grayLight }}
                />
              </div>
            </div>
            <Select
              label=""
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'athlete', label: 'Athletes' },
                { value: 'coach', label: 'Coaches' },
                { value: 'judge', label: 'Judges' },
                { value: 'support', label: 'Support Staff' },
              ]}
            />
            <Select
              label=""
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
            <Button variant="outline" icon={Filter}>More Filters</Button>
          </div>
        </Card>

        {/* Recent Applications */}
        <Card>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.grayDark }}>Recent Applications</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.grayLight}` }}>
                  <th className="text-left py-3 px-4" style={{ color: colors.gray }}>Registration ID</th>
                  <th className="text-left py-3 px-4" style={{ color: colors.gray }}>Name</th>
                  <th className="text-left py-3 px-4" style={{ color: colors.gray }}>Role</th>
                  <th className="text-left py-3 px-4" style={{ color: colors.gray }}>Status</th>
                  <th className="text-left py-3 px-4" style={{ color: colors.gray }}>Time</th>
                  <th className="text-left py-3 px-4" style={{ color: colors.gray }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colors.grayLight}` }}>
                    <td className="py-3 px-4 font-mono text-sm" style={{ color: colors.saffron }}>{app.id}</td>
                    <td className="py-3 px-4 font-medium" style={{ color: colors.grayDark }}>{app.name}</td>
                    <td className="py-3 px-4" style={{ color: colors.gray }}>{app.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${statusColors[app.status]}20`,
                          color: statusColors[app.status],
                        }}
                      >
                        {app.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm" style={{ color: colors.gray }}>{app.time}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        className="text-sm py-1"
                        onClick={() => setCurrentScreen('admin-review')}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Admin Review Screen
const AdminReview = ({ onBack }) => {
  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: colors.offWhite }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} icon={ChevronLeft}>Back to Dashboard</Button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.grayDark }}>Application Review</h1>
            <p style={{ color: colors.saffron }} className="font-mono">WYC2026-ATH-00125</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.offWhite }}
                >
                  <User size={40} style={{ color: colors.gray }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: colors.grayDark }}>Priya Sharma</h2>
                  <p style={{ color: colors.gray }}>Athlete • National • Female</p>
                  <p className="text-sm" style={{ color: colors.saffron }}>Traditional Yogasanas • Senior Category</p>
                </div>
              </div>

              {[
                { title: 'Personal Details', data: [
                  { label: 'DOB', value: '10 Jan 1998' },
                  { label: 'Email', value: 'priya.sharma@email.com' },
                  { label: 'Phone', value: '+91 98765 43210' },
                  { label: 'Aadhaar', value: 'XXXX XXXX 1234' },
                ]},
                { title: 'Event Entry', data: [
                  { label: 'Discipline', value: 'Traditional Yogasanas' },
                  { label: 'Category', value: 'Individual' },
                  { label: 'Age Group', value: 'Senior (18-35)' },
                  { label: 'Age Validation', value: '✓ Valid (27 years)' },
                ]},
              ].map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="font-semibold mb-3" style={{ color: colors.grayDark }}>{section.title}</h3>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: colors.offWhite }}>
                    <div className="grid grid-cols-2 gap-4">
                      {section.data.map((item, i) => (
                        <div key={i}>
                          <span className="text-sm" style={{ color: colors.gray }}>{item.label}</span>
                          <p className="font-medium" style={{ color: colors.grayDark }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.grayDark }}>Uploaded Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'ID Proof (Aadhaar)', file: 'aadhaar_priya.pdf' },
                  { name: 'Passport Photo', file: 'photo_priya.jpg' },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl flex items-center justify-between"
                    style={{ backgroundColor: colors.offWhite }}
                  >
                    <div>
                      <p className="font-medium" style={{ color: colors.grayDark }}>{doc.name}</p>
                      <p className="text-sm" style={{ color: colors.gray }}>{doc.file}</p>
                    </div>
                    <Button variant="outline" className="text-sm py-1" icon={Eye}>View</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.grayDark }}>Verification Actions</h3>
              <div className="space-y-3">
                <Button variant="success" className="w-full" icon={CheckCircle}>Approve Application</Button>
                <Button variant="outline" className="w-full" icon={AlertCircle}>Request Correction</Button>
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: '#EF4444', color: '#EF4444' }}
                  icon={X}
                >
                  Reject Application
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.grayDark }}>Add Note</h3>
              <textarea
                className="w-full p-3 rounded-xl border-2"
                rows={4}
                placeholder="Add verification notes..."
                style={{ borderColor: colors.grayLight }}
              />
              <Button variant="secondary" className="w-full mt-3">Save Note</Button>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.grayDark }}>Activity Log</h3>
              <div className="space-y-3">
                {[
                  { action: 'Application submitted', time: '5 min ago', user: 'Priya Sharma' },
                  { action: 'Documents uploaded', time: '5 min ago', user: 'Priya Sharma' },
                  { action: 'Assigned for review', time: '2 min ago', user: 'System' },
                ].map((log, i) => (
                  <div key={i} className="pb-3 border-b last:border-0" style={{ borderColor: colors.grayLight }}>
                    <p className="text-sm font-medium" style={{ color: colors.grayDark }}>{log.action}</p>
                    <p className="text-xs" style={{ color: colors.gray }}>{log.user} • {log.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');

  const screens = {
    'start': <StartScreen onNext={() => setCurrentScreen('login')} />,
    'login': <LoginScreen onNext={() => setCurrentScreen('profile')} onBack={() => setCurrentScreen('start')} />,
    'profile': <ProfileScreen onNext={() => setCurrentScreen('role')} onBack={() => setCurrentScreen('login')} />,
    'role': <RoleScreen onNext={() => setCurrentScreen('documents')} onBack={() => setCurrentScreen('profile')} />,
    'documents': <DocumentsScreen onNext={() => setCurrentScreen('terms')} onBack={() => setCurrentScreen('role')} />,
    'terms': <TermsScreen onNext={() => setCurrentScreen('preview')} onBack={() => setCurrentScreen('documents')} />,
    'preview': <PreviewScreen onNext={() => setCurrentScreen('status')} onBack={() => setCurrentScreen('terms')} />,
    'status': <StatusScreen onBack={() => setCurrentScreen('preview')} />,
    'admin-dashboard': <AdminDashboard setCurrentScreen={setCurrentScreen} />,
    'admin-review': <AdminReview onBack={() => setCurrentScreen('admin-dashboard')} />,
  };

  const isAdmin = currentScreen.startsWith('admin');

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.offWhite }}>
      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} isAdmin={isAdmin} />
      {screens[currentScreen]}

      {/* Footer */}
      <footer className="py-6 text-center" style={{ backgroundColor: colors.white, borderTop: `3px solid ${colors.green}` }}>
        <div className="flex justify-center items-center gap-4 mb-2">
          <div className="w-8 h-2 rounded" style={{ backgroundColor: colors.saffron }} />
          <div className="w-8 h-2 rounded" style={{ backgroundColor: colors.white, border: `1px solid ${colors.grayLight}` }} />
          <div className="w-8 h-2 rounded" style={{ backgroundColor: colors.green }} />
        </div>
        <p className="text-sm" style={{ color: colors.gray }}>
          World Yogasanas Championship 2026 • June 4-8, 2026
        </p>
        <p className="text-xs mt-1" style={{ color: colors.gray }}>
          © 2026 International Yogasanas Federation. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
