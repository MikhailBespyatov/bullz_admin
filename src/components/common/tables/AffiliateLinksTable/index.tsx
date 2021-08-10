import { Row, Table } from 'antd';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { ExternalLink } from 'components/common/links';
import {
    affiliateLinksColumns,
    defaultAffiliateLinkColumns
} from 'components/common/tables/DescriptionTable/constants';
import { noContentMessage } from 'components/common/tables/ProductDescription/constants';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { Section } from 'components/grid/Section';
import { ChangeAffiliateLinkModal } from 'componentsNewDesign/modals/formModals/products/ChangeAffiliateLinkModal';
import { ChangeDefaultAffiliateLinkModal } from 'componentsNewDesign/modals/formModals/products/ChangeDefaultAffiliateLinkModal';
import React from 'react';
import { affiliateLinksEffects, affiliateLinksEvents } from 'stores/products/affiliateLinks';
// import { parseCalendarDate } from 'utils/usefulFunctions';

interface WrapperProps extends YEAY.GetAffiliateLinkResponse {
    empty?: boolean;
}

interface Props extends YEAY.AffiliateLinkEntryResponse {
    productId?: string;
}

const DefaultAffiliateLinkTable = ({ productId, cultureInfo, priority, url }: Props) => {
    //const [editableUrl, setEditableUrl] = useState(url);

    const changeEditableUrlCallback = () => affiliateLinksEffects.getItemsByProductId(productId || '');

    const data = [
        {
            key: '1',
            // providerId: providerId ? providerId.toString() : <AbsentInfo>{noContentMessage}</AbsentInfo>,
            // utcExpires: utcExpires ? (
            //     parseCalendarDate(new Date(utcExpires))
            // ) : (
            //     <AbsentInfo>{noContentMessage}</AbsentInfo>
            // ),
            cultureInfo: cultureInfo ? cultureInfo.toString() : <AbsentInfo>{noContentMessage}</AbsentInfo>,
            url: url ? <ExternalLink href={url}>{url}</ExternalLink> : <AbsentInfo>{noContentMessage}</AbsentInfo>,
            priority: priority !== undefined ? priority.toString() : <AbsentInfo>{noContentMessage}</AbsentInfo>,
            action: (
                <>
                    <ChangeDefaultAffiliateLinkModal
                        id={productId || ''}
                        url={url || ''}
                        onChange={changeEditableUrlCallback}
                    />
                    <CopyButton subject={url} success="you successfully copied default affiliate link url">
                        copy url
                    </CopyButton>
                </>
            )
        }
    ];

    return (
        <>
            <Table columns={defaultAffiliateLinkColumns} dataSource={data} pagination={false} />
        </>
    );
};

export const AffiliateLinksTable = ({ entries, productId, defaultEntry, empty }: WrapperProps) => {
    const changeEditableArrayCallback = (i: number, url: string) =>
        affiliateLinksEvents.updateAffiliateLinkUrlByIndex({ i, url });

    const data =
        !empty && entries?.length
            ? entries.map(({ cultureInfo = '', priority, url = '' }, i) => ({
                  key: (i + 1).toString(),
                  // providerId: providerId ? providerId.toString() : <AbsentInfo>{noContentMessage}</AbsentInfo>,
                  // utcExpires: utcExpires ? (
                  //     parseCalendarDate(new Date(utcExpires))
                  // ) : (
                  //     <AbsentInfo>{noContentMessage}</AbsentInfo>
                  // ),
                  cultureInfo: cultureInfo ? cultureInfo.toString() : <AbsentInfo>{noContentMessage}</AbsentInfo>,
                  url: url ? (
                      <ExternalLink href={url}>{url}</ExternalLink>
                  ) : (
                      <AbsentInfo>{noContentMessage}</AbsentInfo>
                  ),
                  priority: priority !== undefined ? priority.toString() : <AbsentInfo>{noContentMessage}</AbsentInfo>,
                  action: (
                      <>
                          <ChangeAffiliateLinkModal
                              i={i}
                              id={productId || ''}
                              locale={cultureInfo}
                              url={url}
                              onChange={changeEditableArrayCallback}
                          />
                          <CopyButton subject={url} success="you successfully copied affiliate link url">
                              copy url
                          </CopyButton>
                      </>
                  )
              }))
            : [];

    return (
        <>
            <Row>
                <DefaultAffiliateLinkTable productId={productId} {...defaultEntry} />
            </Row>
            <Section>
                <Table columns={affiliateLinksColumns} dataSource={data} pagination={false} />
            </Section>
        </>
    );
};
