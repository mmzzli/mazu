import * as React from 'react';
import { useEffect, useState } from 'react';
import './home.scss';
import { ChevronRight, ExternalLink } from 'lucide-react';
import avator from '@/assets/images/avator-img.png';
import { Button, Collapse, CollapseItem, Dialog, Popup, PopupPosition, Swiper, Toast } from 'react-vant';
import priceBg from '@/assets/images/price-bg.png';
import logo from '@/assets/images/bigtrainlogo.png';
import Menus from '@/component/Menus.tsx';
import SelectLanguage from '@/component/SelectLanguage.tsx';
import { getHomeBanner, getLpinfo, getTokenInfo, LpInfoInterface } from '@/service/home.ts';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { copyText, formatAddress, formatNumber, generateRandomString, smallNumber } from '@/utils/common.ts';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { getLoginOrRegister, getUserInfo, setInviteLink } from '@/service/user.ts';
import { TOKEN } from '@/utils/const.ts';
import useUserStore from '@/store/user.ts';
import { AnnouncementInterface, getLatestAnnouncement } from '@/service/announcement.ts';
import Iconfont from '@/component/Iconfont.tsx';
import useLanguageStore from '@/store/global.ts';
import { BigNumber } from 'bignumber.js';

interface BannerItem{
	urlimg:string;
}
interface TokenInfoType{
	"price": string,
	"pricedeth": string,
	"totalnumber": string,
	"destroynumber": number,
	"yestodayFireNumber": number,
	"lessNumber": number,
	"btdtoken": string,
	"btdname": string,
	openprice:string
}
const Home:React.FC = () =>{
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [menuVisable, setMenuVisable] = useState<PopupPosition>('')
	const intl = useIntl()
	const [banner, setBanner] = useState<BannerItem[]>([])
	const [announcement,setAnnouncement] = useState<AnnouncementInterface|null>(null)
	const [problems,setProblems] = useState<any[]|null>(null)
	const [tokenInfo, setTokenInfo] =useState<TokenInfoType|null>(null)
	const [lpInfo,setLpInfo] = useState<LpInfoInterface|null>(null)
	const navigate = useNavigate();
	const { address, isConnected,isConnecting, isReconnecting } = useAccount()
	const {signMessageAsync} = useSignMessage()
	const userStore = useUserStore()
	const [visible, setVisible] = useState(false)
	const [invite,setInvite]  = useState(searchParams.get('invite')||'')
	const {language}  = useLanguageStore()

	const problemsMap =  {
		'tw': [
			{
				id: '1',
				question: '什麼是大叻火車項目？',
				answer: '大叻火車是一個基於區塊鏈技術的去中心化金融項目，通過創新的代幣經濟模型為用戶提供多元化的收益機會。',
				isExpanded: false
			},
			{
				id: '2',
				question: '如何參與LP流動性挖礦？',
				answer: '您可以通過PancakeSwap添加Da Lat/USDT流動性，獲得LP代幣後即可享受靜態分紅和動態獎勵。',
				isExpanded: false
			},
			{
				id: '3',
				question: '節點系統如何運作？',
				answer: '節點系統分為普通節點和創世節點，持有節點可享受額外分紅權益和代幣購買優惠。',
				isExpanded: false
			},
			{
				id: '4',
				question: '基金值質押的收益如何計算？',
				answer: '基金值質押收益根據質押金額和時間長度確定，不同檔位享受不同的日化收益率和代幣倍數。',
				isExpanded: false
			},
			{
				id: '5',
				question: '如何邀請好友獲得獎勵？',
				answer: '通過您的專屬邀請連結邀請好友註冊，當好友達到有效用戶標準後，您將獲得團隊業績獎勵和分紅收益。',
				isExpanded: false
			}
		],
		en: [
			{
				id: '1',
				question: 'What is the Da Lat Train project?',
				answer: 'Da Lat Train is a decentralized financial project based on blockchain technology that provides users with diversified income opportunities through an innovative token economic model.',
				isExpanded: false
			},
			{
				id: '2',
				question: 'How to participate in LP liquidity mining?',
				answer: 'You can add Da Lat/USDT liquidity through PancakeSwap. After obtaining LP tokens, you can enjoy static dividends and dynamic rewards.',
				isExpanded: false
			},
			{
				id: '3',
				question: 'How does the node system work?',
				answer: 'The node system is divided into ordinary nodes and genesis nodes. Holding nodes can enjoy additional dividend rights and token purchase discounts.',
				isExpanded: false
			},
			{
				id: '4',
				question: 'How is the fund value staking income calculated?',
				answer: 'Fund value staking income is determined based on the staking amount and time length. Different tiers enjoy different daily rates and token multipliers.',
				isExpanded: false
			},
			{
				id: '5',
				question: 'How to invite friends to get rewards?',
				answer: 'Invite friends to register through your exclusive invitation link. When friends meet the effective user criteria, you will receive team performance rewards and dividend income.',
				isExpanded: false
			}
		],
		vt: [
			{
				id: '1',
				question: 'Dự án Tàu Đà Lạt là gì?',
				answer: 'Tàu Đà Lạt là một dự án tài chính phi tập trung dựa trên công nghệ blockchain, cung cấp cho người dùng các cơ hội thu nhập đa dạng thông qua mô hình kinh tế token sáng tạo.',
				isExpanded: false
			},
			{
				id: '2',
				question: 'Làm thế nào để tham gia khai thác thanh khoản LP?',
				answer: 'Bạn có thể thêm thanh khoản Da Lat/USDT thông qua PancakeSwap. Sau khi có được token LP, bạn có thể hưởng cổ tức tĩnh và phần thưởng động.',
				isExpanded: false
			},
			{
				id: '3',
				question: 'Hệ thống node hoạt động như thế nào?',
				answer: 'Hệ thống node được chia thành node thường và node Genesis. Việc sở hữu node có thể hưởng quyền cổ tức bổ sung và giảm giá mua token.',
				isExpanded: false
			},
			{
				id: '4',
				question: 'Thu nhập staking giá trị quỹ được tính như thế nào?',
				answer: 'Thu nhập staking giá trị quỹ được xác định dựa trên số tiền staking và thời gian. Các bậc khác nhau hưởng tỷ lệ hàng ngày và hệ số nhân token khác nhau.',
				isExpanded: false
			},
			{
				id: '5',
				question: 'Làm thế nào để mời bạn bè nhận phần thưởng?',
				answer: 'Mời bạn bè đăng ký thông qua liên kết mời độc quyền của bạn. Khi bạn bè đáp ứng tiêu chí người dùng hiệu quả, bạn sẽ nhận được phần thưởng hiệu suất đội nhóm và thu nhập cổ tức.',
				isExpanded: false
			}
		]
	};

	document.title = intl.formatMessage({id:'app.name'})

	const clearUser = ()=>{
		console.log(88888888);
		localStorage.removeItem(TOKEN)
		userStore.setUser(null)
		setVisible(false)
	}

	const fetchUserInfo = async ()=>{
		try{
			const res = await getUserInfo()
			userStore.setUser(res)
			if(res?.account?.toLowerCase() !== address?.toLowerCase()){
				clearUser()
				login()
			}
		}catch {
			clearUser()
		}
	}

	useEffect(() => {
		if (isConnecting || isReconnecting) {
		  return;
		}
		if (!isConnected || !address) {
			console.log(9999999,'=======');
			clearUser();
		  return;
		}
		if(isConnected && address){
			if(localStorage.getItem(TOKEN)){
				fetchUserInfo()
			}else{
				login()
			}
		}
}, [isConnected, address, isConnecting, isReconnecting]);



	// 绑定上级
	const bindInvite = async () => {
		if(!invite.trim()){
			Toast(intl.formatMessage({id:'bind.invite.placeholder'}))
			return;
		}
		try{
			// 发起请求
			await setInviteLink(invite)
			setVisible(false)
			try{
				const res = await getUserInfo()
				userStore.setUser(res)
			}catch  {
				localStorage.removeItem(TOKEN)
			}
		}catch (e:any) {
			Toast(e)
		}
	}

	const login = async () => {
		const message = generateRandomString(32)
		const data  = await signMessageAsync({message})
		try{
			const res:any = await getLoginOrRegister({account:address!,hex:message,signed:data})
			localStorage.setItem(TOKEN, res)
			await fetchUserInfo()
		}catch (e:any) {
			localStorage.removeItem(TOKEN)
			userStore.setUser(null)
			setVisible(false)
			Toast(e)
		}
	}

	useEffect(() => {
		const fetchLp = async ()=>{
			const lpInfo = await getLpinfo()
			setLpInfo(lpInfo)

		}
		// 当前登录且没有绑定 PID
		if(userStore.user?.id && !userStore.user.pid && address){
			// 绑定 pid
			setVisible(true)
		}
		// 用户登陆了获取 Lp 信息
		if(userStore?.user?.id && isConnected && userStore.user.account === address){
			fetchLp();
		}else{
			setLpInfo(null)
		}
	}, [userStore.user,address]);

	useEffect(()=>{
		const getBanner = async ()=>{
			const [banner,tokenInfo,announcement] = await Promise.all<any>([getHomeBanner(),getTokenInfo(),getLatestAnnouncement()])
			setBanner(banner)
			setTokenInfo(tokenInfo)
			setAnnouncement(announcement)
		}
		getBanner()
	},[])
	useEffect(() => {
		setProblems(problemsMap[language as keyof typeof problemsMap])
	}, [language]);

	return(
		<div className="container">
			<div className="navbar">
				<div className="left">
					<Iconfont onClick={() => setMenuVisable('left')} icon={'icon-ego-menu'}></Iconfont>
				</div>
				<div className="middle">
					{
						!address ? <ConnectButton /> : <div className="address">{formatAddress(address)}</div>
					}
				</div>
				<div className="right">
					<SelectLanguage/>
				</div>
			</div>

			<div className="swiper">
				<Swiper autoplay style={{height:'225px'}}>
					{
						banner.map((item, index) => {
							return (
								<Swiper.Item key={index}>
									<img src={item.urlimg} width={"100%"} height={"auto"} alt="" />
								</Swiper.Item>
							)
						})
					}

				</Swiper>
			</div>

			<div className="notice m20 card">
				<div className="top" onClick={()=>{
					navigate('/announcements')
				}}>
					<div className="title">
						{intl.formatMessage({id:'home.announcement'})}
					</div>
					<div className="right">
						<ChevronRight size={20} color="#FC6612" />
					</div>
				</div>
				<div className="main">
					<div style={{ fontSize: '12px' }}>
						{announcement?.[`title_${language}`] || announcement?.[`title`]}
					</div>

				</div>
			</div>

			{
				userStore.user?.invit && <div className="card m20 invite">
					<div className="top">
						<div className="title">
							{intl.formatMessage({ id: 'home.invite.title' })}
						</div>
					</div>
					<div className="main">
						<div className="left">
							<img src={avator} alt="" />
						</div>
						<div className="right">
							<div className="text">{intl.formatMessage({ id: 'home.invite.link' })}</div>
							<div className="link">
								<div className="link-text">{`${window.location.origin}?invite=${userStore.user?.invit}`}</div>
								<Iconfont icon={'icon-fuzhi'} onClick={() => {
									copyText(`${window.location.origin}?invite=${userStore.user?.invit}`);
								}}></Iconfont>
							</div>
						</div>
					</div>
				</div>
			}


			<div className="card mv20 token-info">
				<div className="top">
					<div className="title">
						{intl.formatMessage({ id: 'home.token.info' })}
					</div>
				</div>
				<div className="main">
					<div className="list-wrapper">
						<div className="list">
							<div className="left">
								{intl.formatMessage({ id: 'home.token.name' })}：
							</div>
							<div className="right">{tokenInfo?.btdname}</div>
						</div>
						<div className="list">
							<div className="left">
								{intl.formatMessage({ id: 'home.token.address' })}：
							</div>
							<div className="right">
								<span>{formatAddress(tokenInfo?.btdtoken)}</span>
								<Iconfont icon={'icon-fuzhi'} onClick={() => {
									copyText(tokenInfo?.btdtoken || '')
								}}></Iconfont>
							</div>
						</div>
						<div className="list">
							<div className="left">
								{intl.formatMessage({id:'home.token.supply'})}：
								</div>
							<div className="right">{formatNumber(tokenInfo?.totalnumber||0)}</div>
						</div>
					</div>
					<div className="price">
						<img src={priceBg} width={"100%"} height={"auto"} alt="" />
						<div className="price-main">
							<div className="title">
								{intl.formatMessage({id:'home.token.price'})}
								</div>
							<div className="price-box">$ {smallNumber(tokenInfo?.price||0)}</div>
							<div className={BigNumber(tokenInfo?.price||0).minus(tokenInfo?.openprice||0).div(tokenInfo?.openprice||0).multipliedBy(100).toFormat(4).startsWith('-')?'price-down':'price-rise'}>{BigNumber(tokenInfo?.price||0).minus(tokenInfo?.openprice||0).div(tokenInfo?.openprice||0).multipliedBy(100).toFormat(4)}%</div>
						</div>
					</div>

					<div className="swap">
						<div className="link" onClick={()=>{
							window.open('https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0xe8cC9fb1712F04Df6A8f2141f06Db4f72713AeA8')
						}}>
							PancakeSwap
						</div>
						<ExternalLink size={18} color="#FC6612" />
					</div>
					<div className="pools">
						<div className="pools-item">
							<div className="top">
								{intl.formatMessage({id:'home.token.burned'})}
							</div>
							<div className="value">
								{formatNumber(tokenInfo?.yestodayFireNumber||0)} {tokenInfo?.btdname}
							</div>
						</div>
						<div className="pools-item">
							<div className="top">
								{intl.formatMessage({id:'home.token.fund.pool'})}

							</div>
							<div className="value">
								{formatNumber(tokenInfo?.lessNumber||0)} {tokenInfo?.btdname}
							</div>
						</div>
						<div className="pools-item">
							<div className="top">
								{intl.formatMessage({id:'home.token.destroyed'})}
							</div>
							<div className="value">
								{formatNumber(tokenInfo?.destroynumber||0)} {tokenInfo?.btdname}
							</div>
						</div>
					</div>
				</div>
			</div>


			{
				lpInfo ? <div className="card mv20 lp-info">
					<div className="top">
						<div className="title">
							{intl.formatMessage({ id: 'home.lp.title' })}
						</div>
					</div>
					<div className="main">
						<div className="profit">
							<div className="profit-title">
								{intl.formatMessage({ id: 'home.lp.yesterday.dividend' })}
							</div>
							<div className="profit-value">
								{BigNumber(lpInfo?.lpinfo?.yestodaynumber || 0).toFormat()} Da Lat
							</div>
						</div>
						{/*<div className="profit-clean">*/}
						{/*	<div className="left">{intl.formatMessage({ id: 'home.lp.yesterday.dividend' })}：</div>*/}
						{/*	<div className="right">*/}
						{/*		{BigNumber(lpInfo?.lpinfo?.yestodaynumber || 0).toFormat()} Da Lat*/}
						{/*	</div>*/}
						{/*</div>*/}
					</div>
					<div className="top">
						<div className="title">
							{intl.formatMessage({ id: 'home.lp.pool' })}
						</div>
					</div>
					<div className="main">
						<div className="list">
							<Swiper slideSize={76} trackOffset={12}>
								{
									(lpInfo?.levelinfo || []).map((item, index) => {
										const name = item[`name_${language}`] || item.name
										const typeTitle = item.level_id === 0 ? intl.formatMessage({ id: 'home.lp.total.performance' }) : intl.formatMessage({ id: 'home.lp.district.performance' })
										return (
											<Swiper.Item key={item.id}>
												<div className={`list-item list-item-${index % 3 + 1}`}>
													<div className="top-title">
														{name}
													</div>
													<div className="item">
														<div className="left">{intl.formatMessage({ id: 'home.lp.direct.users' })}
														</div>
														<div className="right">{item.num}</div>
													</div>
													<div className="item">
														<div className="left">{intl.formatMessage({ id: 'home.lp.dividend.ratio' })}</div>
														<div className="right">{item.ratio}%</div>
													</div>
													<div className="item">
														<div className="left"> {intl.formatMessage({ id: 'home.lp.performance.requirement' })}</div>
														<div className="right">{formatNumber(item.service_charge)} LP</div>
													</div>
													<div className="item">
														<div className="left"> {intl.formatMessage({ id: 'home.lp.performance.type' })}</div>
														<div className="right">{typeTitle}</div>
													</div>
												</div>
											</Swiper.Item>
										)
									})
								}
							</Swiper>
						</div>
						<div className="mine-lp">
							<div className="mine-lp-title">
								<div className="title">{intl.formatMessage({ id: 'home.lp.my' })}</div>
							</div>
							<div className="mine-lp-value">
								<div className="text">
									{BigNumber(lpInfo?.lpinfo.mynumber || 0).toFormat()}LP
								</div>
								<Button type="danger" round={true} className="primary-button" onClick={() => {
									window.open('https://pancakeswap.finance/swap?utm_source=tokenpocket')
								}}>{intl.formatMessage({ id: 'home.lp.add.liquidity' })}</Button>
							</div>
						</div>
					</div>
				</div>:<></>
			}


			<div className="card mv20 problem">
				<div className="top">
					<div className="title">
						{intl.formatMessage({ id: 'home.faq.title' })}
					</div>
					<div className="desc">
						{intl.formatMessage({ id: 'home.faq.subtitle' })}

					</div>
				</div>

				<div className="main">
					<Collapse>
						{
							problems?.map((item) => {
								const title = item?.question
								const content = item?.answer
								return <CollapseItem title={title} key={item.id} name={item.id}>
									{content}
								</CollapseItem>
							})
						}


					</Collapse>


				</div>
			</div>

			<div className="card mv20 footer">
				<div className="link">
					<div className="link-item">
						𝕏
					</div>
					<div className="link-item">
						💼
					</div>
					<div className="link-item">
						✈️
					</div>
					<div className="link-item">
						📺
					</div>
				</div>
				<div className="info">
					{intl.formatMessage({ id: 'home.footer.disclaimer' })}
				</div>

				<div className="foot-logo">
					<img src={logo} alt="" />
					<span>{intl.formatMessage({ id: 'app.name' })}</span>
				</div>

				<div className="copy">
					{intl.formatMessage({ id: 'home.footer.copyright' })}

				</div>

				<div className="secret">
					<div>{intl.formatMessage({ id: 'home.footer.privacy' })}</div>
					<span>•</span>
					<div>{intl.formatMessage({ id: 'home.footer.terms' })}</div>
				</div>
			</div>
			<Popup
				className={'pop-up-main'}
				visible={menuVisable === 'left'}
				style={{ width: '80%', height: '100%' }}
				position='left'
				onClose={() => {
					setMenuVisable('')
				}}
			>
				<Menus close={() => {
					setMenuVisable('')
				}} />
			</Popup>


			<Dialog
				visible={visible}
				showCancelButton={false}
				showConfirmButton={false}
			>
				<div className="parent-link">
					<div className="title">
						{intl.formatMessage({id:'bind.invite.title'})}
					</div>
					<div className="main">
						<div className="input">
							<input value={invite || ''} onInput={(e: any) => {
								console.log(e);
								setInvite(e.target.value)
							}} placeholder={intl.formatMessage({id:'bind.invite.placeholder'})} />
						</div>
						<div className="info">
							{intl.formatMessage({id:'bind.invite.tip'})}
						</div>
						<div className="button" onClick={bindInvite}>{intl.formatMessage({id:'bind.invite.button'})}</div>
					</div>
				</div>


			</Dialog>
		</div>

	)
}
export default Home