export const getFileType = (memType) => {
  switch (memType) {
    case 'text/plain':
      return 'TXT';
    case 'application/pdf':
      return 'PDF';
    case 'application/msword':
      return 'DOC';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'DOCX';
    case 'application/vnd.ms-publisher':
      return 'PUB';
    case 'application/vnd.ms-powerpoint':
      return 'PPT';
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'PPTX';
    case 'application/vnd.ms-excel':
      return 'XLSX';
    case 'application/zip':
      return 'ZIP';
    case 'application/vnd.rar':
      return 'RAR';
    case 'audio/mpeg':
    case 'audio/wav':
    case 'audio/aac':
      return 'AUDIO';
    case 'video/x-msvideo':
    case 'video/mp4':
    case 'video/mpeg':
    case 'video/ogg':
      return 'VIDEO';

    default:
      return 'IMAGE';
  }
};
