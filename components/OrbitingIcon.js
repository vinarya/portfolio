import { motion } from 'framer-motion'
import SocialIcon from '@/components/social-icons'

const OrbitingIcon = ({ kind, href, style }) => (
  <motion.div
    className="absolute"
    style={style}
    animate={{ rotate: 360 }}
    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
  >
    <SocialIcon kind={kind} href={href} />
  </motion.div>
)

export default OrbitingIcon
